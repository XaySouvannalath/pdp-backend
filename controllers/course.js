const courses = require('../db_apis/course')
const setID = require('../controllers/autoID')

function getCourseFromRec(req) {
    const course = {
        // CourseID:  await setID.setID('tb_course', 'CourseID', 'CSE', 3, 3, "0"),
        CourseID: req.body.CourseID,
        CourseTypeID: req.body.CourseTypeID,
        CourseName: req.body.CourseName,
        WhenTrain: req.body.WhenTrain
    }
    return course
}


async function get(req, res, next) {
    try {
        const context = {}
        context.id = req.params.id
        const rows = await courses.find(context)

        res.status(200).json(rows)
    } catch (err) {
        next(err)
    }
}



//*****************************POST**************************** */
async function post(req, res, next) {
    try {
        let course = getCourseFromRec(req)
       let result = await courses.create(course)
       /*   console.log(result); */
        res.status(201).json({
            success: true,
            message: 'success',
            data: result
        })
       
    } catch (err) {
        next(err)
    }
}
//*****************************End**************************** */


module.exports.post = post
module.exports.get = get
