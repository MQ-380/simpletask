const UserModule = require('../module/user');

class UserController {
    static async users(ctx){
        const { query } = ctx.request;
        try{
            const data = await UserModule.getUsers(query);

            let newData = data.map(e => ({
                    key: e.user_id,
                    name: e.user_name,
                    age: e.user_age,
                    userType: e.user_type === 'Admin' ? 'Admin' : 'Employee',
                }))
            
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                data: newData
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
            const data = await UserModule.addUsers(body)
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

    static async editUser(ctx){
        const { body } = ctx.request;
        try{
            const data = await UserModule.editUser(body)
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
        const {body} = ctx.request;
        console.log(body);
        if(body){
            try{
                const data = await UserModule.delUser(body)
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
                const data = await UserModule.addUsers(query)
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

module.exports = UserController;