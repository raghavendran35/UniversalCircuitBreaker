/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { coreRouter } from "./core_router";


//load in environment variables
dotenv.config();

/**
 * App variables
 */
//exit if no PORT defined
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 * App configuration
 */

// mount the middleware functions
// helmet has defensive things, dns prefetch con
app.use(helmet());
// all CORs requests
app.use(cors());
//can parse incoming requests with JSON payloads
app.use(express.json());
//take in optional path + callback function representing middleware function
app.use("api/v1.0/universalbreaker", coreRouter);

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})