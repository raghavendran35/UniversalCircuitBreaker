import { CircuitBreaker } from "../models/circuit_breaker.interface";
import * as uuid from 'uuid';
import { SQSClient } from "@aws-sdk/client-sqs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { makeCircuitBreakerPolicy } from "./circuit_breaker_policy.implementations";

let sqsClient: SQSClient;
let dynamoDBclient: DynamoDBClient;

const params = {
    /** input parameters */
  };

export enum CircuitBreakerStates {
    OPEN,
    CLOSED,
    HALF_OPEN,
}

// for now, no deleting/updating circuit breaker, we can add that functionality in a bit
function makeCircuitBreaker(circuit_breaker: CircuitBreaker) {
    const circuit_breaker_policy = makeCircuitBreakerPolicy(circuit_breaker.policy_json);

    let command;

    const id = uuid.v4().toString();
    //dynamoDBclient.send(command)
    //.then((data) => {
    // process data.
    //})
    //.catch((error) => {
    // error handling.
    //})
    //.finally(() => {
    // finally.
    //});

    

}

function switchCircuitBreakerState() {
    // todo evaluate policy 
}


export function init(passedSqsClient: any, passedDynamoDBClient: any) {
    // initialize sqsClient and dynamoDBclient from initialized
    sqsClient = passedSqsClient;
    dynamoDBclient = passedDynamoDBClient;
}