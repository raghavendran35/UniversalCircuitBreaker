import express from "express";
import { ResultsRequestMetadata } from "./models/results_metadata.interface";
import { RedisImplementationLayer } from "./redis/redis_implementation_layer";
import { CircuitBreakerGateway } from "./circuitbreaker/circuit_breaker_gateway";

/**
 * Router Definition
 */

export const coreRouter = express.Router();

// Add route for new Redis schema setup
// TODO!



// Add route for checking breaker status
coreRouter.get("/getBreakerStatus/:breakerId", async (req: Request, res: Response) => {
    try {
        console.log(req.params.breakerId);
        const response = CircuitBreakerGateway.getCircuitBreakerGateway().checkStateForBreakerId(req.params.breakerId);
        res.status(201).json(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
  });

// Add route recording result for Redis
coreRouter.post("/recordResult", async (req: Request, res: Response) => {
    try {
        const recordRequestResultMetadata: ResultsRequestMetadata = req.body;
        await RedisImplementationLayer.getRedisImplementationLayer().set_results_metadata(recordRequestResultMetadata);
        res.status(201).json("Result is saved to redis!");
    } catch (e) {
        res.status(500).send(e.message);
    }
  });

// health route
coreRouter.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send("Healthy!");
    } catch (e) {
        res.status(500).send(e.message);
    }
  })




