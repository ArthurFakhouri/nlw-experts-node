import { FastifyInstance } from "fastify";
import { createPoll } from "./create-poll";
import { getPoll } from "./get-poll";
import { voteOnPoll } from "./vote-on-poll";

type RouteProps = {
    route: (app: FastifyInstance) => Promise<void>
    prefix: string
}

export const routes = [
    { route: getPoll, prefix: "polls" },
    { route: createPoll, prefix: "polls" },
    { route: voteOnPoll, prefix: "polls" },
] as RouteProps[]