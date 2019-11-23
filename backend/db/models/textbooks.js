const Sequelize = require('sequelize')
const db = require('../db')

const Textbooks = db.define('textbooks', {
  textbook_id: 
  {
    type: Sequelize.STRING,
    validate: {len: 10}
    primaryKey: true     
  },

  authors: 
  {
    type: Sequelize.STRING,
    allowNull: false    
  },

  title:
  {
    type: Sequelize.STRING,
    allowNull: false
  },

  edition:
  {
    type: Sequelize.INT,
    allowNull: false
  },

  price:
  {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {isDecimal: true}
  },

  amazon_url:
  {
    type: Sequelize.STRING,
    allowNull: false
  },

  pdf_url:
  {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Textbooks;