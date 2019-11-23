const Sequelize = require('sequelize')
const db = require('../db')

const Course_Textbooks = db.define('course_textbooks', {
  course_id: 
  {
    type: Sequelize.STRING,
    validate: {len: [6, 7]}
    primaryKey: true      
  },

  textbook_id: 
  {
    type: Sequelize.STRING,
    validate: {len: 10}
    primaryKey: true
  },  
});

module.exports = Course_Textbooks;