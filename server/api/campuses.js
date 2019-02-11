const router = require('express').Router()
const { Student, Campus } = require('../db/models')

module.exports = router

//GET api/campuses -- serve up all campuses
router.get('/', async (req,res,next)=> {
  try {
    const campuses = await Campus.findAll()
    res.json(campuses)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//GET api/campuses/(someId) -- serve up a specific campus
router.get('/:campusId', async (req,res,next)=> {
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

//POST api/campuses -- add a new campus
router.post('/', async (req,res,next)=> {
  try {
    
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//PUT api/campuses -- edit a campus
router.put('/:studentId', async (req,res,next)=> {
  try {
    
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//DELETE api/campuses -- delete a campus from the db
router.delete('/:studentId', async (req,res,next)=> {
  try {
    
  } catch (err) {
    console.error(err)
    next(err)
  }
})
