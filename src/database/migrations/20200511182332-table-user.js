'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type : Sequelize.INTEGER,
          primaryKey : true,
          autoIncrement : true,
          allowNull : false  
        },
        username : {
          type : Sequelize.STRING,
          allowNull : false
        },
        email : {
          type : Sequelize.STRING,
          unique : true,
          allowNull : false
        },
        password : {
          type : Sequelize.STRING,
          allowNull : false
        },
        whatsapp : {
          type : Sequelize.STRING,
        },
        behance : {
          type : Sequelize.STRING,
        },
        instagram : {
          type : Sequelize.STRING,
        },
        facebook : {
          type : Sequelize.STRING,
        },
        descricao_pessoal : {
          type : Sequelize.TEXT,
        },
        created_at : {
          type : Sequelize.DATE,
          allowNull : false
        },
        updated_at : {
          type : Sequelize.DATE,
          allowNull : false
        }
       });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
