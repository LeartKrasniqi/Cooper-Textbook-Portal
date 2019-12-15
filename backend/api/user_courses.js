const router = require('express').Router();
const {User_Courses, Course_Textbooks, Courses, Suggested_Links, Textbooks, Users} = require('../db/models');
module.exports = router

/* Get all courses associated with a particular user */
router.get('/:id', async (req, res, next) => {
  try 
  {
    const user = await User_Courses.findAll({
      where: {
        username: req.params.id
      },
      include: [ {model: Courses, include: [{model: Course_Textbooks, include: [{model: Textbooks}] }]} ]
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
    res.status(200).send("Request successful")
    console.log("Added course")
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Course already exists for that user')
    } else {
      next(err)
    }
  }
})

/* Delete user_course entry */
router.delete('/delete', (req, res, next) => {
  try {
    User_Courses.destroy({
      where: {
        username: req.body.username,
        course_id: req.body.course_id
      }
    })
    res.status(200).send("Request successful")
  } catch (error) {
    res.status(500).send('No associated user with that course');
    console.log("Could not delete user with id # " + req.body.user_id)
  }
})