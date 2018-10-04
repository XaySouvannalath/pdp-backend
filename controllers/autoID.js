const autoID = require('../db_apis/autoID')


//usage   const id = await setID.setID('tb_course', 'CourseID', 'CSE', 3, 3, "0")
async function setID(TableName, ColumnID, Style, startIndex, length, pad) {
    try {
        let result = await autoID.getAutoId(ColumnID, TableName)
        let lastIdObject = result[0].CourseID
        let newID = Style + (pad + (parseInt(lastIdObject.substr(startIndex, length)) + 1))
        return newID
    } catch (err) {
        throw err
    }
}

module.exports.setID = setID