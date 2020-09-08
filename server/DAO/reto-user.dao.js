const RetoUser = require('../models/reto-user.model');
const { eliminarDia, registrarDia } = require('./dia.dao');

let actualizar = (idInscripcion) => {
    let final = false;
    RetoUser.findById(idInscripcion, (err, inscripcionDB) => {

        let dias = inscripcionDB.dias;
        let diaActual = dias[dias.length - 1];

        if (inscripcionDB.diaActual === inscripcionDB.totalDias) {

            inscripcionDB.estado = "OK";
            inscripcionDB.fechaFinalizado = new Date().getTime();
            // inscripcionDB.avance = "100";

            diaActual.estado = "NOOK";
            diaActual.fechaRealTermino = new Date().getTime();

            inscripcionDB.dias.pop();
            inscripcionDB.dias.push(diaActual);
            final = true;

        } else {

            let nuevoDia = {
                dia: diaActual.dia + 1,
                inicio: diaActual.fin,
                fin: (Number(diaActual.fin) + Number(process.env.CADUCA_DIA)),
                estado: 'PROCESO'
            }

            diaActual.estado = 'NOOK';
            diaActual.fechaRealTermino = new Date().getTime();

            dias.pop();
            dias.push(diaActual);
            dias.push(nuevoDia);
            inscripcionDB.dias = dias;
            //inscripcionDB.avance = Math.round(100 / inscripcionDB.totalDias) === 0 ? 0 : Math.round(diaActual.dia * 100 / inscripcionDB.totalDias);
            inscripcionDB.diaActual += 1;

        }

        inscripcionDB.ultActualizacion = new Date().getTime();
        inscripcionDB.save((errGuardar, inscripcionNuevo) => {

            if (errGuardar) {
                console.log(errGuardar);
                return;
            }


            // registra dato en colleccion dia, para validar caducidad
            if (!final) {
                registrarDia(inscripcionNuevo.dias[dias.length - 1], inscripcionNuevo._id);
            } else {
                eliminarDia(inscripcionNuevo._id);
            }

        })

    })

}

module.exports = {
    actualizar
}