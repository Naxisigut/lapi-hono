import { serve } from '@hono/node-server'
import app from './app.js'

serve({
  fetch: app.fetch,
  port: 10086
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
