//ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'desa';

process.env.CADUCA_DIA = process.env.CADUCA_DIA || (1000 * 60 * 2);


process.env.DB_URI = process.env.NODE_ENV === "desa" ? "mongodb://localhost:27017/nippy_db_desa" : process.env.MONGO_PROD;