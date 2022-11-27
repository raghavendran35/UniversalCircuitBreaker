# AgnosticCB
### Overviews
AgnosticCB is a bundled [circuit breaker](https://martinfowler.com/bliki/CircuitBreaker.html) implemenation. It's a non-language-native implementation of the pattern which should afford flexibility of use. 

Goal: Don't be reactive, be proactive

#### Features
We don't want to compromise on the ease of use

* in-memory data caching (hits, misses, etc.) with Redis
* generic breaker rules (a yml or json based templating language)
* linking with public platforms (gcp, aws, azure) so their alarms can be used as part of a rule
* Fallback path, multiple routes
* healthchecks

Later:
* Dashboard
* predictive insights based on metrics behavior
* Run time series models on metrics data possibly?
* Load tests
* Host-level routing?


### Installation
TBD

### Usage
TBD

### Example
TBD

### License
MIT License


