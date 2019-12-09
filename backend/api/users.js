const router = require('express').Router();
const {Users} = require('../db/models');
module.exports = router


router.get('/', async (req, res, next) => {
  try 
  {
    // const users = await Users.findAll({
    //   attributes: ['username','type', 'is_approved']
    // })
    // res.json(users)

    // Only let admin see full table
    if(req.user.type == 2) {
      const users = await Users.findAll({
        attributes: ['username', 'type', 'is_approved']
      })
      res.json(users)
    } 
    else {
      res.status(500).send("Access Denied")
    }
  } 
  catch (err) 
  {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try 
  {
    const user = await Users.findAll({
      where: {
        username: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})



