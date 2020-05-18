const { Model, DataTypes } = require('sequelize');

class User extends Model{
    static init(sequelize){//conexão com o banco
        super.init({
              username :  DataTypes.STRING,
              email : DataTypes.STRING,
              password : DataTypes.STRING,
              whatsapp :  DataTypes.STRING,
              behance : DataTypes.STRING,
              instagram :  DataTypes.STRING,
              facebook :  DataTypes.STRING,
              descricao_pessoal : DataTypes.TEXT
        },{
            sequelize
        })

    }
}
module.exports = User;