const Koa = require('koa')
const router = require('./router')


const koa = new Koa()
const serviceName = 'TestService'
const port = 3333 

const start = module.exports = async => {
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
