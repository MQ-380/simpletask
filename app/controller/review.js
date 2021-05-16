const ReviewModule = require('../module/review')

class ReviewController {
    static async reviews(ctx){
        const { query } = ctx.request;
        try{
            const data = await ReviewModule.getReviews(query);
            let newData = data.map(e => ({
                key: e.review_id,
                from: e.review_from,
                to: e.review_to,
                content: e.content,
                hasBeenDone: e.has_done,
                addPeople: e.create_by,
            }))
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data:newData
            }
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err
            }
        }
    }

    static async addReview(ctx){
        const { body } = ctx.request;
        try{
            const data = await ReviewModule.addReview(body)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data
            }
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err
            }
        }
    }

    static async editReview(ctx) {
        const { body } = ctx.request;
        try {
            const data = await ReviewModule.editReview(body);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data
            }
        } catch(err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err
            }
        }
    }

    static async completeReview(ctx) {
        const { body } = ctx.request;
        try {
            const data = await ReviewModule.completeReview(body);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data
            }
        } catch(err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                err
            }
        }
    }

    static async getReviewList(ctx) {
        const { body }  = ctx.request;
        try {
            const data = await ReviewModule.getReviewList(body);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data
            }
        } catch(e) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: 'error',
                e
            }
        }
    }
}

module.exports = ReviewController;