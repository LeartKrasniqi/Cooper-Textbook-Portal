const Sequelize = require('sequelize')
const db = require('../db')

const Suggested_Links = db.define('suggested_links', {
  course_id: 
  {
    type: Sequelize.STRING,
    validate: {len: [5, 8]},
    primaryKey: true     
  },

  username: 
  {
    type: Sequelize.STRING,
    primaryKey: true     
  },

  pdf_url:
  {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Suggested_Links;