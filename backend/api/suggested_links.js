const router = require('express').Router();
const {Suggested_Links} = require('../db/models');
module.exports = router


/* Get suggested links for a particular course */
router.get('/:id', async (req, res, next) => {
  try 
  {
    const links = await Suggested_Links.findAll({
      where: {
        course_id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Add a suggested link
* Need (course_id, user_id, pdf_url)
*/
router.post('/add_course', async (req, res, next) => {
  try {
    const link = await Suggested_Links.create(req.body)
    res.status(200).send("Request successful");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('You have already suggested a link for that course')
    } else {
      next(err)
    }
  }
})

/* Delete suggest_link entry */
router.delete('/delete', (req, res, next) => {
  try {
    Suggested_Links.destroy({
      where: {
        course_id: req.body.course_id,
        user_id: req.body.user_id
      }
    })
    res.status(200).send("Request successful")
  } catch (error) {
    res.status(500).send('No associated link with that course');
    // console.log("Could not delete suggested_link with id # " + req.body.course_id)
  }
})
