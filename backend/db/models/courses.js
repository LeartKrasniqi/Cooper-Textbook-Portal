const Sequelize = require('sequelize')
const db = require('../db')

const Courses = db.define('courses', {
  course_id: 
  {
    type: Sequelize.STRING,
    validate: {len: [6, 7]},
    primaryKey: true     
  },

  course_title: 
  {
    type: Sequelize.STRING,
    allowNull: false     
  },

  course_professor:
  {
    type: Sequelize.STRING,
    allowNull: false
  }  
});

module.exports = Courses;