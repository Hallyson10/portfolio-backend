'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('projetos', { 
        id: {
          type : Sequelize.INTEGER,
          primaryKey : true,
          autoIncrement : true,
          allowNull : false  
        },
        user_id: {
          type : Sequelize.INTEGER,
          allowNull : false,
          references : { model : 'users' , key : 'id'},
          onUpdate : 'CASCADE',
          onDelete : 'CASCADE'
        },
        imagem_principal : {
          type : Sequelize.STRING
        },
        titulo : { 
          type : Sequelize.STRING
        },
        sub_titulo : { 
          type : Sequelize.STRING
        },
        descricao : { 
          type : Sequelize.TEXT
        },
        data_realizacao : { 
          type : Sequelize.STRING
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
      return queryInterface.dropTable('projetos');
  }
};
