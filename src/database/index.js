const Sequelize = require('sequelize');
const dbConfig = require('../config/database')
const User = require('../models/User');
const Projetos = require('../models/Projetos');
const Images = require('../models/Images')
const database = new Sequelize(dbConfig);

User.init(database); //iniciando o model e passando a conexão do banco
Projetos.init(database);
Images.init(database);
module.exports = database;
