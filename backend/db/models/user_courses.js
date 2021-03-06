const Sequelize = require('sequelize')
const db = require('../db')

const User_Courses = db.define('user_courses', {
  username: 
  {
    type: Sequelize.STRING,
    primaryKey: true  
  },

  course_id: 
  {
    type: Sequelize.STRING,
    validate: {len: [5, 8]},
    primaryKey: true      
  }

});

module.exports = User_Courses;