import fastify from 'fastify'
import { routes } from '../routes'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'

const app = fastify()

app.register(websocket)
app.register(cookie, {
    secret: "polls-app-nlw", // for cookies signature
    hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}  // options for parsing cookies
})

routes.forEach(route => app.register(route.route, { prefix: route.prefix }))

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP Server Running 🚀")
})