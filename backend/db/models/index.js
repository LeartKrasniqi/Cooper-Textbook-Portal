const Course_Textbooks = require('./course_textbooks');
const Courses = require('./courses');
const Suggested_Links = require('./suggested_links');
const Textbooks = require('./textbooks');
const Users = require('./users');
const User_Courses = require('./user_courses');

/* Might need to add properties such as hasMany, belongsTo, etc. */

/* Export */
module.exports = {
  Course_Textbooks,
  Courses,
  Suggested_Links,
  Textbooks,
  Users, 
  User_Courses
}