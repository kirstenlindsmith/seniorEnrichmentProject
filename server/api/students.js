const router = require('express').Router()
const { Student, Campus } = require('../db/models')

module.exports = router

//GET api/students -- serve up all students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.json(students)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//GET api/students/(someId) -- serve up a specific student
router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId
      }
    })
    res.json(student)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//POST api/students -- add a new student
router.post('/', async (req, res, next) => {
  try {
    const [campus] = await Campus.findOrCreate({
      where: {
        name: req.body.campus || 'New York'
      }
    })
    const student = Student.build(req.body)
    student.setCampus(campus, {save: false})
    await student.save()
    const returnedStudent = student.toJSON()
    returnedStudent.campus = campus
    res.json(returnedStudent)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//PUT api/students -- edit a student
router.put('/:studentId', async (req, res, next) => {
  try {
    
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//DELETE api/students -- delete a student from the db
router.delete('/:studentId', async (req, res, next) => {
  try {
    
  } catch (err) {
    console.error(err)
    next(err)
  }
})
