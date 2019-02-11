const Sequelize = require('sequelize')
const db = require('../database')
// const Student = require('./Student')

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    isUrl: true,
    defaultValue: 'https://imgur.com/a/G3IAFYk'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
// }, {
//   defaultScope: {
//     include: [
//       { model: Student}
//     ]
//   }
})
