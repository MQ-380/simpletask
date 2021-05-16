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
            const data = await UserModule.addUsers(body);
            const backData = await UserModule.getUsers(body);
            let newData = backData.map(e => ({
                key: e.user_id,
                name: e.user_name,
                age: e.user_age,
                userType: e.user_type === 'Admin' ? 'Admin' : 'Employee',
            }))
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: 'success',
                newData
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
            const data = await UserModule.editUser(body);
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
        let cookieSetting = {
            domain: 'localhost', 
            maxAge: 24 * 60 * 1000, 
            httpOnly: false,  
            overwrite: false  
        }
        const { body } = ctx.request;
        try{
            let q = JSON.parse(body);
            if( q.user_name === 'root' ) {
                ctx.cookies.set(
                    'username', 
                    'root',
                    cookieSetting
                );
                ctx.cookies.set(
                    'power', 
                    'Admin',
                    cookieSetting
                );  
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    data: [{
                        user_name: 'root',
                        user_type: "Admin"
                    }]
                }
            } else {
                const data = await UserModule.queryUsers(body);
                ctx.response.status = 200;
                if((data && data.length > 0)) {
                    ctx.cookies.set(
                        'username', 
                        data[0].user_name,
                        cookieSetting
                    );
                    ctx.cookies.set(
                        'power', 
                        data[0].user_type,
                        cookieSetting
                    );  
                    ctx.body = {
                        code: 200,
                        msg: 'success',
                        data
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        msg:'no such user',
                        err: 'error'
                    }
                }
            }   
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: -2,
                msg:'error',
                err
            }
        }
    }
}

module.exports = UserController;