const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const db = new Sequelize('postgres://localhost:5432/cooper_textbook_portal'); 

module.exports = db;

