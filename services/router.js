const express = require('express')
const router = express.Router()
const course = require('../controllers/course')
const autoid = require('../controllers/autoID')

router.route('/courses/:id?')
    .get(course.get)
    .post(course.post)
    

/* router.route('/autoid')
    .get(autoid.get) */




module.exports = router