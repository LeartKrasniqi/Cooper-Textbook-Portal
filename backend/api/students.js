const router = require('express').Router();
const {User_Courses, Course_Textbooks, Courses, Suggested_Links, Textbooks, Users} = require('../db/models');
module.exports = router
const Sequelize = require('sequelize');
const db = require('../db')

/* Get textbook details for classes for a specific id 
	Need to return: [course_id | course_title | course_prof | tb_id | tb_title | tb_edition | tb_authors | amazon_url | pdf_url]
*/
router.get('/:id', async (req, res, next) => {
  try 
  {
    var Query = "SELECT C.course_id, C.course_title, C.course_professor, T.textbook_id, T.title, T.edition, T.authors, T.amazon_url, T.pdf_url FROM courses as C, user_courses as UC, textbooks as T, course_textbooks as CT WHERE UC.username = \'" + req.params.id + "\' AND C.course_id = UC.course_id AND C.course_id = CT.course_id AND CT.textbook_id = T.textbook_id;"
    console.log(Query)
    const user = await db.query(Query, {
        // replacements: {id: req.params.id},
        type: db.QueryTypes.SELECT
      })
    res.json(user)
  } catch (err) {
    next(err);
  }
})


/* Add a suggested link
* Need (course_id, username, pdf_url)
*/
router.post('/add_link', async (req, res, next) => {
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

/* Add a course for a user 
* Need (username, course_id)
*/
router.post('/add_course', async (req, res, next) => {
  try {
    console.log('/add_course api:')
    console.log(req.body)
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
router.delete('/remove_course', (req, res, next) => {
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






