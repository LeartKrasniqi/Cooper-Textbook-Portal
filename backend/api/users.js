const router = require('express').Router();
const {Users} = require('../db/models');
module.exports = router


router.get('/', async (req, res, next) => {
  try 
  {
    const users = await Users.findAll({
      attributes: ['user_id','username','type', 'is_approved']
    })
    res.json(users)
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
        user_id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err);
  }
})



