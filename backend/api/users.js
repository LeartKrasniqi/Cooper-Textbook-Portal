const router = require('express').Router();
//const {Users} = require('../db/models');
const {User_Courses, Course_Textbooks, Courses, Suggested_Links, Textbooks, Users} = require('../db/models');
module.exports = router
const Sequelize = require('sequelize');
const db = require('../db')

/* Get all users */
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

/* Get user by specific id */
router.get('/:id', async (req, res, next) => {
  try 
  {
    // const user = await Users.findAll({
    //   where: {
    //     username: req.params.id
    //   },
    // })
    const user = await db.query(
      'SELECT U.username, C.course_id, C.course_title, C.course_professor FROM users U, courses C, user_courses UC WHERE U.username = (:id) AND UC.username = (:id) AND C.course_id = UC.course_id;', {
        replacements: {id: req.params.id},
        type: db.QueryTypes.SELECT
      })
    res.json(user)
  } catch (err) {
    next(err);
  }
})



