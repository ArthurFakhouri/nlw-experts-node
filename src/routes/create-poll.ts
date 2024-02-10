import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { prisma } from "../lib/prisma"

export async function createPoll(
    app: FastifyInstance,
) {
    app.post("/polls", async (req: FastifyRequest, reply: FastifyReply) => {
        const bodyParser = z.object({
            title: z.string()
        })
        const { title } = bodyParser.parse(req.body)

        const poll = await prisma.poll.create({
            data: {
                title,
            }
        })

        return reply.status(201).send({ pollId: poll.id })
    })
}