const db = require('../config/db')
const Sequelize = db.sequelize;
const Sequelizes = require('sequelize')
const User = require('../schema/users.js')(db.sequelize, Sequelizes.DataTypes);
User.sync({force: false})

class UserModule {
    static async getUsers(query){
        console.log('query',query)
        return await User.findAll({
            where: {
                ...query
            },
            order:[
                ["user_id","DESC"]
            ],
        })
      
    }

    static async delUser(body){
        let query = JSON.parse(body);
        console.log(query);
        return await User.destroy({
            where:{
                user_id: query.user_id
            }
        })
    }

    static async addUsers(body){
        let query = JSON.parse(body);
        return await User.create({
            user_name: query.username,
            user_type:query.usertype,
            user_age: query.age
        })
    }

    static async editUser(body) {
        let query = JSON.parse(body);
        console.log(query.name);
        return await User.update({
            user_name: query.name,
            user_type: query.userType,
            user_age: query.age
        }, {
            where: {
                user_id: query.key
            }
        })
    }
}

module.exports = UserModule;