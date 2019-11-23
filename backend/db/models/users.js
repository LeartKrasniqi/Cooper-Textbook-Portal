const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Users = db.define('users', {
  user_id: 
  {
    type: Sequelize.STRING,    
    primaryKey: true     
  },

  username:
  {
    type: Sequelize.STRING,
    allowNull: false
  },

  /* Security */
  salt: 
  {
    type: Sequelize.STRING,
    get() { return () => this.getDataValue('salt') }
  },

  password: 
  {
    type: Sequelize.STRING,
    get() { return () => this.getDataValue('password') }
  }

  /* Type of user: 0 = Student, 1 = Teacher, 2 = Admin */
  type:
  {
    type: Sequelize.INTEGER,
    validate:
    {
      min: 0,
      max: 2
    },
    allowNull: false
  }

  /* Determine if teacher is approved (should be kept true for all other users) */
  is_approved:
  {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }

});

/* Methods for PW generation */
Users.prototype.correctPassword = function(candidatePwd) 
{
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

Users.generateSalt = function() 
{
  return crypto.randomBytes(16).toString('base64')
}

Users.encryptPassword = function(plainText, salt) 
{
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = u => 
{
  if (u.changed('password')) {
    u.salt = User.generateSalt()
    u.password = User.encryptPassword(u.password(), u.salt())
  }
}

Users.beforeCreate(setSaltAndPassword)
Users.beforeUpdate(setSaltAndPassword)



module.exports = Users;