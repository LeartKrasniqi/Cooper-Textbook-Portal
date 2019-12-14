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
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('You have already suggested a link for that course')
    } else {
      next(err)
    }
  }
})
