const mysql = require('mysql')
const dbConfig = require('../config/database')
const run = require('../services/dbrun')

async function initialize() {
    const pool = await mysql.createPool(dbConfig.hrPool)
}

// there are also close method below here but
    
async function exec(statement, binds = []) {
    return new Promise(async (resolve, reject) => {
        try {
            run.query(statement,binds, (err,results)=>{
                resolve(results)
            })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports.initialize = initialize
module.exports.exec = exec