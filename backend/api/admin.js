const router = require('express').Router();
const {User_Courses, Course_Textbooks, Courses, Suggested_Links, Textbooks, Users} = require('../db/models');
module.exports = router
const Sequelize = require('sequelize');
const db = require('../db')

/* Get pending professors */
router.get('/pending_profs', async (req, res, next) => {
  try 
  {
    const user = await Users.findAll({
      where: {
        type: 1,
        is_approved: false
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Approve professor (Change the is_approved to true) */
router.put("/approve_prof/:username", async (req, res, next) => {
  try {
    const edit = req.body
    const update = await Users.update(edit, {
      where: {
        username: req.params.username
      }
    })
    res.json(update)
  } catch (error) {
    next(error)
  }
})



/* Remove a course (and all of its associated data) */
router.delete('/delete/:id', async (req, res, next) => {
  try 
  {
    Courses.destroy({
      where: {
        course_id: req.params.id
      }
    })

    Course_Textbooks.destroy({
      where: {
        course_id: req.params.id
      }
    })

    User_Courses.destroy({
      where: {
        course_id: req.params.id
      }
    })
    res.status(200).send('Request Successful')
  } catch (err) {
    next(err);
  }
})


/* Add course */
router.post('/add_course', async (req, res, next) => {
  try {
    const course = await Courses.create(req.body)
    res.status(200).send("Request successful");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Course already exists')
    } else {
      next(err)
    }
  }
})

