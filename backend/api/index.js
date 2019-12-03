const router = require('express').Router()
module.exports = router

// router.use('/course_textbooks', require('./course_textbooks'))
// router.use('/courses', require('./courses'))
// router.use('/suggested_links', require('./suggested_links'))
// router.use('/textbooks', require('./textbooks'))
router.use('/users', require('./users'))

router.use((req, res, next) => 
{
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})