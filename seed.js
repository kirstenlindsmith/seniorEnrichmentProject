const {db} = require('./server/db')
const {green, red} = require('chalk')
const {Student, Campus} = require('./server/db/models')

const students = [
  {
    firstName: 'David',
    lastName: 'Yang',
    email: 'david@fullstackacademy.com',
    imageUrl: 'https://i.imgur.com/aDr2Eks.png',
    gpa: 4.0,
    campusId: 1
  },
  {
    firstName: 'Nimit',
    lastName: 'Maru',
    email: 'nimit@fullstackacademy.com',
    imageUrl: 'https://i.imgur.com/egTViXC.png',
    gpa: 4.0,
    campusId: 1
  },
]

const campuses = [
  {
    name: 'New York',
    imageUrl: 'https://i.imgur.com/sugPsqU.png',
    address: '5 Hanover Square, NYC',
    description: `Margaret Hamilton Academy was founded by David Yang and Nimit Maru. David and Nimit are both instructors at Margaret Hamilton and engineers who have each spent over 17 years programming, both professionally and as hobbyists. They have built large e-commerce apps, an educational games company with 6 million+ players, enterprise healthcare software, and more. They've worked together at Yahoo, on startups, and went through Y Combinator in Silicon Valley, where Margaret Hamilton Academy was born. Celebrating the successes of Margaret Hamilton students and getting to build the best coding school in the world make them two of the happiest people alive. The entire Margaret Hamilton team brings that same enthusiasm each day, dedicating themselves to creating a world-class educational experience for students.`
  },
  {
    name: 'Chicago',
    imageUrl: 'https://i.imgur.com/BCOolVQ.png',
    address: 'Somewhere, Chicago, IL',
    description: `The second campus for Margaret Hamilton is in Chicago. Not much is known about this school. It is fairly new, and still a mystery. Please contact us with any information about the Chicago Campus, so we can better flesh out this website.`
  },
  {
    name: 'Remote',
    imageUrl: 'https://i.imgur.com/6HsklpD.png',
    address: 'Your bedroom! The moon! Anywhere!',
    description: `Our remote campus option allows students from all corners of the galaxy to learn Javascript.`
  } 
]


const seed = async () => {
  await db.sync({force: true})

  await Promise.all(campuses.map(campus => {
    return Campus.create(campus)
  }))
  
  await Promise.all(students.map(student=> {
    return Student.create(student)
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
