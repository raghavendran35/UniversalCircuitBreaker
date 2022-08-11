/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import * as AWSdynamoDB from "@aws-sdk/client-dynamodb";
import * as AWSsqs from "@aws-sdk/client-sqs";
import { coreRouter } from "./core_router";
import { init } from "./implementations/circuit_breaker.implementations";


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
app.use("api/v1.0/cbass", coreRouter);

// maybe can plugin/pass aws clients here
const dynamoDBClient = new AWSdynamoDB.DynamoDB(
    {
        region: "us-east-2",
        credentials:
        { accessKeyId: process.env.AWS_ACCESS_KEY || "" ,
          secretAccessKey: process.env.AWS_SECRET_KEY || ""
        }
    });
const sqsClient = new AWSsqs.SQSClient(
    {
        region: "us-east-2",
        credentials:
        { accessKeyId: process.env.AWS_ACCESS_KEY || "" ,
          secretAccessKey: process.env.AWS_SECRET_KEY || ""
        }
    });

init(dynamoDBClient, sqsClient);

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})