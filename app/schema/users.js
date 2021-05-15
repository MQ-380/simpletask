const user = (sequelize, DataTypes) => {
    return sequelize.define('users',{
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_name'
        },
        user_age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_age'
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_type'
        }
    },{
        freezeTableName: false
    })
}
module.exports =  user
