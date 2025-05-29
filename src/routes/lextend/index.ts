import { Hono } from 'hono'
import { websites } from './models/website.js'

const lextend = new Hono()

lextend.get('/', (c) => {
  return c.text('Welcome to Lextend!')
})

lextend.get('/AllWebsites', (c) => {
  return c.json({
    code: 0,
    message: 'success',
    data: websites
  })
})

export default lextend
