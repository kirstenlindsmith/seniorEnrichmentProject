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
    defaultValue: 'https://static.boredpanda.com/blog/wp-content/uploads/2018/04/handicapped-cat-rexie-the-handicat-dasha-minaeva-60-5acb4f1d1cdbb__700.jpg'
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
