const router = require('koa-router')()
const ReviewController = require('../controller/review')



router.prefix('/review')

router.get('/reviews', ReviewController.reviews);

module.exports = router
