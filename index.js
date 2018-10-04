const webServer = require('./services/web-server')
const dbConfig = require('./config/database')
const database = require('./services/database')


// Increase thread pool size by poolMax
//process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function startUp() {

//hello world phase 1
    //handle starting the database
/*     try{
        console.log('Inintializing Database Module...')
        await database.initialize()
    }catch(err){
        console.error(err)
        process.exit(1)
    } */


    //handing starting the server
    console.log('Starting the application...');
    try {
        console.log('Initializing the server module');
        await webServer.initialize()

    }
    catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }
}
startUp()

async function shutDown(e) {
    let err = e

    console.log('Shutting down')

    try {
        console.log('Closing web server module')

        await webServer.close()
    }catch(e){
        console.log('Encountered Error', e)
        err=err|e
    }
    console.log('Existing Process')
    if(err){
        process.exit(1)
    }else{
        process.exit(0)
    }
}

process.on('SIGTERM', () => {
    console.log('Recieve SIGTERM')
    shutDown()
})

process.on('SIGINT', () => {
    console.log('Recieve SIGINT')
    shutDown()
})

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception');
    console.error(err)
    shutDown(err)
})