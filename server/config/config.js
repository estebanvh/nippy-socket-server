//ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'desa';
process.env.PORT = process.env.PORT || 3100;
process.env.CADUCA_DIA = process.env.CADUCA_DIA || (1000 * 60 * 2);

process.env.MONGO_USER = process.env.MONGO_USER || "";
process.env.MONGO_PASS = process.env.MONGO_PASS || "";
process.env.DB_URI = process.env.NODE_ENV === "desa" ? "mongodb://localhost:27017/nippy_db_desa" : process.env.DB_URI;
process.env.MONGO_AGENDA = process.env.MONGO_AGENDA || "mongodb://localhost:27017/nippy_db_desa";
process.env.PERIODICIDAD = process.env.PERIODICIDAD || "one minute"