const Koa = require('koa')
const router = require('./router')
const config = require('../config/default.js')
const {server: {port}} = config


const koa = new Koa()
const serviceName = 'TestService'

const start = async () =>  {
  try {
    koa.use(router().routes())
    const server = koa.listen(port)
    console.log(`${serviceName} start on http://localhost:${port}`)
    return server
  } catch (error) {
    console.error(error)
  }
}

start()
