import fastify from "fastify";
import cors from "@fastify/cors"
import clienteRoutes, { produtoRoutes, servicoRoutes } from "./routes";

const app = fastify({logger: true})

const start = async () => {

await app.register(cors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});


await app.register(clienteRoutes)
await app.register(produtoRoutes)
await app.register(servicoRoutes)


    try{
        await app.listen({port:3307})
    }catch(err){
        process.exit(1)
    }

} 

start();