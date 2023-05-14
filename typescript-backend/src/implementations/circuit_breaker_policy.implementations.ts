import { CircuitBreakerPolicy } from "../models/circuit_breaker_policy.interface";
import * as uuid from 'uuid';

// note alarms for CW and other situations should be very loose (like p59 should be very high)
enum CircuitBreakerPolicyNames {
    // literally flip back on after some time
    BASIC_TIME_FLIP,
    CLOUDWATCH_ALARM,
}

export function makeCircuitBreakerPolicy(policy_json: string) {
    const circuit_breaker_policy = convertJsonToPolicy(policy_json);
    // No dynamoDB save, just construct and return it
    circuit_breaker_policy.id = uuid.v4().toString();
    return convertPolicyToJson(circuit_breaker_policy);
}

function convertJsonToPolicy(policy: string) {
    return JSON.parse(policy);
}

function convertPolicyToJson(policy: CircuitBreakerPolicy) {
    return JSON.stringify(policy);
}

// no aws clients here, just pass in values and stuff
function evaluatePolicy(policy: CircuitBreakerPolicy, past_runs: Record<string, boolean>) {
    const policyName = policy.type;
    // The rule engine
    switch(policyName) { 
        case CircuitBreakerPolicyNames.BASIC_TIME_FLIP.toString(): { 
           //statements; 
           break; 
        }
        default: { 
           //statements; 
           break; 
        } 
     }
}