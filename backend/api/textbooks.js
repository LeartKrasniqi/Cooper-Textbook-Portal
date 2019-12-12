const router = require('express').Router();
const {Textbooks} = require('../db/models');
module.exports = router


/* Get info about specific textbook */
router.get('/:id', async (req, res, next) => {
  try 
  {
    const textbook = await Textbooks.findAll({
      where: {
        textbook_id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Add a textbook */
router.post('/add_textbook', async (req, res, next) => {
  try {
    const textbook = await Textbooks.create(req.body)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Textbook already exists')
    } else {
      next(err)
    }
  }
})

/* Edit textbook */
router.put("/edit_textbook/:id", async (req, res, next) => {
  try {
    const edit = req.body
    const update = await Textbooks.update(edit, {
      where: {
        id: req.params.id
      }
    })
    res.json(update)
  } catch (error) {
    next(error)
  }
})
