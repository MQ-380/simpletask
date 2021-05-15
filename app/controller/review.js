const ReviewModule = require('../module/review')

class ReviewController {
    static async reviews(ctx){
        const { query } = ctx.request;
        try{
            const data = await ReviewModule.getReviews(query);
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

    static async addUsers(ctx){
        const { body } = ctx.request;
        try{
            console.log(body);
            const data = await ReviewModule.addUsers(body)
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

    static async delUser(ctx){
        const query = ctx.params.id;
        console.log('query', query)
        if(query){
            try{
                const data = await ReviewModule.delUser(query)
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
                    msg:'error',
                    err
                }
            }
        }else{
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '缺少id',
            }
        }
    }


    static async login(ctx){
        const query = ctx.request.body;
        if(query.password && query.username){
            try{
                const data = await ReviewModule.addUsers(query)
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
                    msg:'error',
                    err
                }
            }
        }else{
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不全'
            }
        }
    }
}

module.exports = ReviewController;