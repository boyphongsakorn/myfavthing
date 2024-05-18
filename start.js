const fastify = require('fastify')({ logger: true })
const fs = require('fs')
const util = require('node:util')
const { pipeline } = require('node:stream')
const pump = util.promisify(pipeline)

fastify.register(require('@fastify/multipart'))

// Declare a route
fastify.post('/', async function handler (request, reply) {
    const data = await request.file()
    //create folder 
    fs.mkdir('./uploads', { recursive: true }, (err) => {
        if (err) throw err;
    });
    await pump(data.file, fs.createWriteStream(`./uploads/${data.filename}`))
    reply.send({ uploaded: true, message: `File ${data.filename} uploaded, thanks!` })
})

// Run the server!
fastify.listen({ host: '0.0.0.0',port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})