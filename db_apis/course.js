const database = require('../services/database')
const setID = require('../controllers/autoID')


//*****************************Read**************************** */
const baseQuery = `SELECT * FROM TB_COURSE `
async function find(context) {
     
    let query = baseQuery
    const binds = {}
    if (context.id) {
        binds.CourseID = context.id
        query += `WHERE CourseID = ?`
        console.log(binds.CourseID)
        console.log(query)
    }
    const result = await database.exec(query, binds.CourseID) //oracle use binds instead of binds.CourseID
    return result
}

//*****************************End Read**************************** */





//*****************************Create**************************** */
const createQuery = `
INSERT INTO TB_COURSE(
    CourseID, 
    CourseTypeID, 
    CourseName, 
    WhenTrain) 
    VALUES 
    (?,?,?,?)
`   
async function create(cse) {
    
    const course = Object.assign({}, cse);
    course.CourseID = await setID.setID('tb_course', 'CourseID', 'CSE', 3, 3, "0")
    const result = await database.exec(createQuery, [course.CourseID,course.CourseTypeID, course.CourseName, course.WhenTrain]);
  /*   console.log(course) */
    return course;
}
//*****************************End Create**************************** */


module.exports.find = find
module.exports.create = create