import { FastifyInstance } from "fastify";
import { voting } from "../utils/voting-pub-sub";
import z from "zod";

export async function pollResult(app: FastifyInstance) {
    app.get('/:pollId/results', { websocket: true }, (con, req) => {
        const pollResultParams = z.object({
            pollId: z.string().uuid(),
        })

        const { pollId } = pollResultParams.parse(req.params)

        voting.subscribe(pollId, (message) => {
            con.socket.send(JSON.stringify(message))
        })
    })
}