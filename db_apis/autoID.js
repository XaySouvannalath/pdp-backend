const database = require('../services/database')


//table name
//column name
//
//usage id = Auto.SetID(ConstVar.constr, "SellID", "tb_Selling", "DLD", 3, 11, 11, "00000000000");
// public static string SetID(string colummID, string TableName, string style, int startIndex, int length, int padwidth, string pad)
async function getAutoId(colummID, TableName) {
    let sql = `SELECT ${colummID} FROM ${TableName} ORDER BY ${colummID} DESC`
    let result = database.exec(sql)
    return result
}

module.exports.getAutoId = getAutoId