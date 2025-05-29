import { Hono } from 'hono'
import lextend from './routes/lextend/index.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/Lextend', lextend)

app.notFound((c) => {
  return c.text('Not Found', 404)
})

export default app
