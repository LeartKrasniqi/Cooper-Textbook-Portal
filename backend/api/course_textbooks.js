const router = require('express').Router();
const {Course_Textbooks} = require('../db/models');
module.exports = router

/* Get all textbooks for a particular course */
router.get('/:id', async (req, res, next) => {
  try 
  {
    const user = await Course_Textbooks.findAll({
      where: {
        course_id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Add link between textbook and course 
* Need (course_id, textbook_id)
*/
router.post('/', async (req, res, next) => {
  try {
    const course_tb = await Course_Textbooks.create(req.body)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Specified textbook already exists for course')
    } else {
      next(err)
    }
  }
})

/* Delete course_textbook entry */
router.delete('/delete/:id', (req, res, next) => {
  try {
    Course_Textbooks.destroy({
      where: {
        course_id: req.params.id
      }
    })
    res.status(200)
  } catch (error) {
    res.status(500).send('No associated textbook with that course');
    console.log("Could not delete course_textbook with id # " + req.params.id)
  }
})