
const fastify = require('fastify')({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,    // Показывать все ошибки
      coerceTypes: false, // Не преобразовывать типы
      removeAdditional: false // Не удалять дополнительные поля
    }
  }
})
const http = require('http')
const userRouter = require('./routers/user.router')
const path = require('path')
const fs = require('fs').promises;


fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'server'),
  prefix: '/public/', // optional: default '/'
})

fastify.addHook('onSend', (request, reply, payload, done) => {
    console.log('📤 Sending response:', payload);
    done();
});

require('dotenv').config()
fastify.register(userRouter)


// const app = fastify()

// app.use('/db', userRouter)

const PORT = process.env.PORT || 3000

fastify.get('/', async function handler (request, reply) {
  try {
    // Читаем HTML файл
    const htmlPath = path.join(__dirname, 'test_interface.html');
    const htmlContent = await fs.readFile(htmlPath, 'utf8');
    
    // Устанавливаем заголовок Content-Type и отправляем HTML
    return reply.type('text/html').send(htmlContent);
  } catch (error) {
    reply.code(500).send('Error loading page');
  }
})

fastify.listen({ port: PORT }, (err) => {
  console.log(`Server started on port ${PORT}`)
if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

// const app = fastify()



// app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))