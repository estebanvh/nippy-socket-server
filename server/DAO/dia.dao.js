const Dia = require('../models/dia.model');

const diasCaducados = async(time) => {

    console.log("time: " + time);

    try {

        let diasDB = await Dia.find({ fin: { $lt: time } }).populate('idReto').exec();
        if (diasDB.length === 0) {

            console.log('No hay dias caducados');
            return;
        }

        let dias = [];
        diasDB.forEach((dia) => {
            dias.push({
                idDia: dia.idDia,
                idInscripcion: dia.idReto,
                idUser: dia.idReto.user
            });
        });

        console.log('Dias caducados: ' + dias.length);
        return dias;

    } catch (err) {
        console.log(err);
        return [];

    }
};

const eliminarDia = (inscripcionID) => {
    Dia.deleteOne({ idReto: inscripcionID }, (err, deleteDB) => {

        if (err) {
            console.log(err);
            return;
        }

    });

}

let registrarDia = (dia, idReto) => {


    let body = {
        idReto: idReto,
        idDia: dia._id,
        dia: dia.dia,
        inicio: dia.inicio,
        fin: dia.fin,
        estado: dia.estado,
        fechaRealTermino: dia.fechaRealTermino
    }

    let registro = new Dia(body);
    registro.save((err, diaDB) => {

        if (err) {
            console.log(err);
            return;
        }

    });

}


module.exports = {
    diasCaducados,
    eliminarDia,
    registrarDia
}