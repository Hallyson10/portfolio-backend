const { Model, DataTypes } = require('sequelize');

class Projetos extends Model{
    static init(sequelize){//conexão com o banco
        super.init({
            imagem_principal : DataTypes.STRING,
            user_id : DataTypes.INTEGER,
            titulo : DataTypes.STRING,
            sub_titulo :  DataTypes.STRING,
            descricao : DataTypes.TEXT,
            data_realizacao : DataTypes.STRING
        },{
            sequelize
        })

    }
}
module.exports = Projetos;