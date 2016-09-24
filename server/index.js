import 'babel-polyfill'
import Koa from 'koa'
import convert from 'koa-convert'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'

import siteRoute from './routes/site'
import apiRoute from './routes/api'

const app = new Koa()

app.keys = ['some secret keys']
app.use(convert(session({
  key: 'gungnir:sess'
}, app)))
app.use(convert(bodyParser()))
app.use(json())

siteRoute(app)
apiRoute(app)

app.listen(8081, () => {
  console.log('listening on port 8081')
})
