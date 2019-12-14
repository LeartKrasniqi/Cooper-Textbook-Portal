const router = require('express').Router();
const {User_Courses} = require('../db/models');
module.exports = router

/* Get all courses associated with a particular user */
router.get('/:id', async (req, res, next) => {
  try 
  {
    const user = await User_Courses.findAll({
      where: {
        username: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Add a course for a user 
* Need (username, course_id)
*/
router.post('/add_course', async (req, res, next) => {
  try {
    const user_course = await User_Courses.create(req.body)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Course already exists for that user')
    } else {
      next(err)
    }
  }
})