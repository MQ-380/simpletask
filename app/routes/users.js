const router = require('koa-router')()
const UserController = require('../controller/user')



router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/users', UserController.users);

router.post('/addUser', UserController.addUsers);

router.post('/editUser', UserController.editUser);

router.post('/delUser', UserController.delUser);

module.exports = router
