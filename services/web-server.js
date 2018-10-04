//import needed package
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const database = require('./database')
//import needed local config file
const webServerConfig = require('../config/web-server')
const router = require('../services/router')


let httpServer


function initialize() {
    return new Promise(async (resolve, reject) => {
        const app = express()
        httpServer = http.createServer(app)
        app.use(morgan('combined')) // Combines logging info from request and response
        app.use(bodyParser.json());

        app.get('/', async (req, res) => {

        })
        app.get('/courses', async (req, res) => {
            const result = await database.exec('SELECT * FROM TB_COURSE')
            res.end(JSON.stringify(result));
        })
        app.get('/courses/:id', async (req, res) => {
            const result = await database.exec('SELECT * FROM TB_COURSE WHERE COURSEID = ?', [req.params.id])
            res.end(JSON.stringify(result));
        })
        app.use('/api', router)

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost:${webServerConfig.port}`);

                resolve();
            })
            .on('error', () => {
                reject(err);
            })
    })
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err)
                return;
            }
            resolve()
        })
    })
}

module.exports.initialize = initialize
module.exports.close = close