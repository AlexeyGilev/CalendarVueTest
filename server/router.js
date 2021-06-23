const Router = require('koa-router')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const getCalendarFromSql = require('./calendar')

module.exports = () => {
  const router = new Router()

  router.use(json())
  router.use(bodyParser())

  router.get('/', async ctx => {
    ctx.body = { response: 'Welcome to test service' }
  })


  router.post('/calendar', async ctx => {
    const { body: { startDate, endDate } } = ctx.request
    console.log(ctx.request.body)
    if (startDate && endDate) {
      const cal = await getCalendarFromSql('2012-05-30', '2012-06-25')
      ctx.body = { response: cal.recordset} //тут вывести каледнарь
      ctx.status = 200
    } else {
      ctx.body = { result: 'Period is not set' }
      ctx.status = 404
    }
  })
  return router
}
