const router = require('express').Router();
const {Courses} = require('../db/models');
module.exports = router


/* Get all courses */
router.get('/', async (req, res, next) => {
  try 
  {
    const courses = await Courses.findAll()
    res.json(courses)
  } 
  catch (err) 
  {
    next(err)
  }
})

/* Get course by particular id */
router.get('/:id', async (req, res, next) => {
  try 
  {
    const course = await Courses.findAll({
      where: {
        course_id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Add course */
router.post('/add_course', async (req, res, next) => {
  try {
    const course = await Courses.create(req.body)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Course already exists')
    } else {
      next(err)
    }
  }
})

/* Edit course */
router.put("/edit_course/:id", async (req, res, next) => {
  try {
    const edit = req.body
    const update = await Courses.update(edit, {
      where: {
        id: req.params.id
      }
    })
    res.json(update)
  } catch (error) {
    next(error)
  }
})

/* Delete course entry */
router.delete('/delete/:id', (req, res, next) => {
  try {
    Courses.destroy({
      where: {
        course_id: req.params.id
      }
    })
    res.status(200)
  } catch (error) {
    res.status(500).send('That course does not exit');
    console.log("Could not delete course with id # " + req.params.id)
  }
})

