const Sequelize = require('sequelize')
const db = require('../database')
const Campus = require('./Campus')

module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    isUrl: true,
    defaultValue: 'https://imgur.com/a/h56Syzi'
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 4.0
    }
  },
}, {
  defaultScope: {
    include: [
      { model: Campus}
    ]
  }
})
