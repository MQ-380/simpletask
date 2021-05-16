const Sequelize = require('sequelize')
//Config database here
//0 -> databaseName 1 -> database user 2 -> databasepassword 
const sequelize = new Sequelize('PAY','root','65433858m',{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
})

module.exports = {
    sequelize
}