const { Model, DataTypes } = require('sequelize');

class Images extends Model{
    static init(sequelize){//conexão com o banco
        super.init({
            projeto_id : DataTypes.INTEGER,
            original_name : DataTypes.STRING
        },{
            sequelize
        })

    }
}
module.exports = Images;