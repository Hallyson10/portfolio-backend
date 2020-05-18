'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('images', { 
        id : {
          type : Sequelize.STRING,
          primaryKey : true
        },
        projeto_id : {
          type : Sequelize.INTEGER,
          allowNull : false,
          references : { model : 'projetos' , key : 'id'},
          onUpdate : 'CASCADE',
          onDelete : 'CASCADE'
        },
        original_name : {
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
      return queryInterface.dropTable('images');
  }
};
