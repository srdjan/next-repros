const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare().then(_ => {
  const server = createServer((req, res) => {
    handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> App running on port ${PORT}`)
  })
})
