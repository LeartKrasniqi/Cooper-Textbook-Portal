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
    const user = await db.query(
      'SELECT C.course_id, T.textbook_id, T.title, T.edition, T.authors, T.amazon_url, T.pdf_url FROM courses C, user_courses UC, textbooks T, course_textbooks CT WHERE UC.username = (:id) AND C.course_id = UC.course_id AND C.course_id = CT.course_id AND CT.textbook_id = T.textbook_id;', {
        replacements: {id: req.params.id},
        type: db.QueryTypes.SELECT
      })
    res.json(user)
  } catch (err) {
    next(err);
  }
})

/* Edit textbook */
/* Also add pdf_url manually if you want to approve the suggested_link */
router.put("/edit_textbook/:id", async (req, res, next) => {
  try {
    const edit = req.body
    const update = await Textbooks.update(edit, {
      where: {
        textbook_id: req.params.id
      }
    })
    res.json(update)
  } catch (error) {
    next(error)
  }
})

/* Get suggested links each course associated with the teacher */
router.get('/suggested_links/:id', async (req, res, next) => {
  try 
  {
    const links = await await db.query(
      'SELECT SL.course_id, SL.username, SL.pdf_url FROM suggested_links SL, users U, user_courses UC WHERE U.username = UC.username AND UC.course_id = SL.course_id;', {
        replacements: {id: req.params.id},
        type: db.QueryTypes.SELECT
      })
    res.json(links)
  } catch (err) {
    next(err);
  }
})

/* Remove a suggested_link (either approved --> make edit to tb, or reject --> no furher action) */
router.delete('/suggested_link/remove', (req, res, next) => {
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
    console.log("Could not delete suggested_link with id # " + req.body.course_id)
  }
})

/* Add a textbook (only) */
router.post('/add_textbook', async (req, res, next) => {
  try {
    const textbook = await Textbooks.create(req.body)
    res.status(200).send("Request successful");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Textbook already exists')
    } else {
      next(err)
    }
  }
})

/* Add a textbook (associated to course) 
  Should only include (course_id, textbook_id)
*/
router.post('/add_course_textbook', async (req, res, next) => {
  try {
    const course_textbook = await Course_Textbooks.create(req.body)
    res.status(200).send("Request successful");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Textbook already exists')
    } else {
      next(err)
    }
  }
})

/* To remove a textbook, make a call to /api/course_textbooks/delete */
/* Delete course_textbook entry */
router.delete('/delete_course_textbook', (req, res, next) => {
  try {
    Course_Textbooks.destroy({
      where: {
        course_id: req.body.course_id,
        textbook_id: req.body.textbook_id
      }
    })
    res.status(200).send("Request successful")
  } catch (error) {
    res.status(500).send('No associated textbook with that course');
    console.log("Could not delete course_textbook with id # " + req.params.id)
  }
})
