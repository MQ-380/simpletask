const db = require('../config/db')
const Sequelize = db.sequelize;
const Sequelizes = require('sequelize')
const Review = require('../schema/review.js')(db.sequelize, Sequelizes.DataTypes);
Review.sync({force: false})

class ReviewModule {
    static async getReviews(query){
        console.log('query',query)
        return await Review.findAll({
            where: {
                ...query
            },
            order:[
                ["review_id","DESC"]
            ],
        })
      
    }

    static async delUser(user_id){
        return await Review.destroy({
            where:{
                user_id
            }
        })
    }

    static async addUsers(body){
        let query = JSON.parse(body);
        return await Review.create({
            user_name: query.username,
            user_type:query.usertype,
            user_age: query.age
        })
    }
}

module.exports = ReviewModule;