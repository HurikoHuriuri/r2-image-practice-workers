import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'

type Bindings = {
  MY_BUCKET: R2Bucket
  USERNAME: string
  PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Access to environment values
app.put('/upload/:key', async (c, next) => {
  const key = c.req.param('key')
  await c.env.MY_BUCKET.put(key, c.req.body)
  return c.text(`Put ${key} successfully!`)
})

app.get('/', async (c) => {
  return c.text('get!')
})

app.get('/:key', async (c) => {
  const key = c.req.param('key')
  const get = (await c.env.MY_BUCKET.get(key)).blob
  console.log(get)
  return c.text('test')
})

export default app
