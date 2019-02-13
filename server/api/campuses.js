const router = require('express').Router()
const { Student, Campus } = require('../db/models')

module.exports = router

//GET api/campuses -- serve up all campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll()
    res.json(campuses)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//GET api/campuses/(someId) -- serve up a specific campus
router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findOne({
      where: {
        id: req.params.campusId
      }
    })
    res.json(campus)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:campusId/students', async (req, res, next) => {
  try {
    const students = await Student.findAll({
      where: {
        campusId: req.params.campusId
      }
    })
    res.json(students)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//POST api/campuses -- add a new campus
router.post('/', async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body)
    res.redirect(`/campuses/${campus.id}`)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// PUT api/campuses -- edit a campus
router.put('/:campusId', async (req, res, next) => {
  try {
    // const updatedCampus = await Campus.update(
    //   {name: req.body.name,
    //   address: req.body.address,
    //   imageUrl: req.body.imageUrl,
    //   description: req.body.description},
    //   {where: {id: req.params.campusId}}
    // )
    
    // const changedCampus = await Campus.findOne({
    //   where: {
    //     id: req.params.campusId
    //   }
    // })
    // changedCampus.update({
    //   name: req.body.name,
    //   address: req.body.address,
    //   imageUrl: req.body.imageUrl,
    //   description: req.body.description
    // })

    const campusId = req.params.campusId
    const campus = await Campus.findOne({
      where: {
        id: campusId
      }
    })
    await campus.update(req.body)
    res.redirect(`/campuses/${campus.id}`)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//DELETE api/campuses -- delete a campus from the db
router.delete('/:campusId', async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.campusId
      }
    })
    res.sendStatus(202)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
