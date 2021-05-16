const router = require('koa-router')()
const ReviewController = require('../controller/review')

router.prefix('/review')

router.get('/reviews', ReviewController.reviews);

router.post('/addReview', ReviewController.addReview);

router.post('/editReview', ReviewController.editReview);

router.post('/getReviewList', ReviewController.getReviewList);

router.post('/completeReview', ReviewController.completeReview);

module.exports = router
