require('dotenv').config()
module.exports = {
    dialect : 'postgres',
    host : process.env.HOST,
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : process.env.DATA_BASE,
    define : {
        timestamps : true,
        underscored : true
    }
}