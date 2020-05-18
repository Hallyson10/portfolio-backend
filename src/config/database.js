require('dotenv').config()
module.exports = {
    dialect : 'postgres',
    host : process.env.HOST,
    username : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATA_BASE,
    port : process.env.PORT,
    define : {
        timestamps : true,
        underscored : true
    }
}