const db = require('../config/db')
const Sequelize = db.sequelize;
const Sequelizes = require('sequelize')
const Review = require('../schema/review.js')(db.sequelize, Sequelizes.DataTypes);
Review.sync({force: false})

class ReviewModule {
    static async getReviews(query){
        return await Review.findAll({
            where: {
                ...query
            },
            order:[
                ["review_id","DESC"]
            ],
        })
      
    }

    static async editReview(body) {
        let query = JSON.parse(body);
        return await Review.update({
            review_from: query.from,
            review_to: query.to
        },{
            where: {
                review_id: query.key
            }
        })
    }

    static async addReview(body){
        let query = JSON.parse(body);
        return await Review.create({
            review_from: query.from,
            review_to:query.to,
            content: '',
            has_done: false,
            create_by: query.addPeople,
        })
    }

    static async getReviewList(body) {
        let query = JSON.parse(body);
        return await Review.findAll({
            where: {
                review_from: query.now_user,
            }
        });
    }

    static async completeReview(body) {
        let query = JSON.parse(body);
        return await Review.update({
                content: query.content,
                has_done: true,
            },
            {where: {
                review_id: query.review_id,

            }});
    }
}

module.exports = ReviewModule;