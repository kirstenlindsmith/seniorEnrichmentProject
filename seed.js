const {db} = require('./server/db')
const {green, red} = require('chalk')
const {Student, Campus} = require('./server/db/models')

const students = [
  {
    firstName: 'David',
    lastName: 'Yang',
    email: 'david@fullstackacademy.com',
    imageUrl: 'https://imgur.com/a/h56Syzi',
    gpa: 4.0
  },
  {
    firstName: 'Nimit',
    lastName: 'Maru',
    email: 'nimit@fullstackacademy.com',
    imageUrl: 'https://imgur.com/a/WPPsAdD',
    gpa: 4.0
  },
]

const campuses = [
  {
    name: 'New York',
    imageUrl: 'https://imgur.com/a/G3IAFYk',
    address: '5 Hanover Square, NYC',
    description: `Margaret Hamilton Academy was founded by David Yang and Nimit Maru. David and Nimit are both instructors at Margaret Hamilton and engineers who have each spent over 17 years programming, both professionally and as hobbyists. They have built large e-commerce apps, an educational games company with 6 million+ players, enterprise healthcare software, and more. They've worked together at Yahoo, on startups, and went through Y Combinator in Silicon Valley, where Margaret Hamilton Academy was born. Celebrating the successes of Margaret Hamilton students and getting to build the best coding school in the world make them two of the happiest people alive. The entire Margaret Hamilton team brings that same enthusiasm each day, dedicating themselves to creating a world-class educational experience for students.`
  }  
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(students.map(student=> {
    return Student.create(student)
  }))

  await Promise.all(campuses.map(campus => {
    return Campus.create(campus)
  }))

  console.log(green('Seeding success!'))
  db.close()
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })
