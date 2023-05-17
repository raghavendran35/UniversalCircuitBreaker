# Typescript backend
## Usage
* Record response status/result
* Get status of the breaker
* Initialize Breaker a.k.a. initialize Redis storage (hooks into shell script maybe?)

## Elements
### Index/Entrypoint
* Responsible for startup, set up, etc.

### Core Router
* Endpoints
  * /api/v1.0/universalbreaker/getBreakerStatus GET
    * Gets the status of the breaker
    * Request: breaker-id (string)
    * Response: OPEN, CLOSE, (TODO: evaluate use of HALF-CLOSED) --> should all be strings
  * /api/v1.0/universalbreaker/recordResult GET (TODO: move to POST)
    * Records status of the relevant API call for the breaker
    * Request: breaker-id (string), responseStatusCode (number), apiTag (for distinguishing different APIs)

### Breaker Gateway
* Directly invoked via Core Router
* Use local "cache" -> BreakerStateCache.ts
  * We can update this and treat it as a cache for the application bundle. 

### Policy Engine
* Triggered by recordStatus api call 
  * Pulls values from Redis (and later, metric values from Cloud platforms)
  * Also has reference to current policy (json?)
  * passes it to Rule Evaluator

### Rule Evaluator
* Invoked by Policy Engine
* Passes through Redis values + policy json
* performs evaluation of the rule and updates the BreakerStateCache values accordingly

### Redis Structure
* TBD
* Also need a getter layer, a good reference implementation: https://dotmethod.me/posts/nodejs-typescript-redis-cache/