![GitHub](https://img.shields.io/github/license/raghavendran35/AgnosticCB?style=flat-square)
# UniversalCircuitBreaker

## The future of automated fault tolerance

### Overviews
AgnosticCB is a bundled [circuit breaker](https://martinfowler.com/bliki/CircuitBreaker.html) implemenation. It's a non-language-native implementation of the pattern which should afford flexibility of use so anyone can host it on their infrastructure

Goal: Don't be reactive, be proactive

#### Who is this for?
* developers looking for a hands-free, easy-to-integrate Circuit Breaker solution
* developers looking to integrate 3P metrics/monitoring into their circuit breakers
* people who don't want to deal with a thundering herd problem and want a better overall picture of their service availability

#### How it works (high level)
It would be a protected call:
* Before making a HTTP request, first check status of the specific Circuit Breaker (Redis)
* If it is open, don't make call, return basic failure
* If it is closed, make call and synchronously send status of success or failure (implicit timestamp) to redis 

Meanwhile, under the hood:
* Compute, based on policy and history of success/failures/time, what the breaker state is
* Each request should trigger a computation (for now, we can optimize it later with time based policies)

You, as the developer:
* Can create your own policies and experiment
* integrate policy with 3P platforms like AWS, Azure, GCP
* Integrate metrics with 3P platforms like Grafana, Prometheus, Kibana, AWS, Azure, GCP

![Example Image](https://drive.google.com/uc?id=1rrDXwdFQV1dPqcfcA2wBeNvFzTaFthsL)

#### Features
We don't want to compromise on the ease of use

* in-memory data caching (hits, misses, etc.) with Redis
  * Local server support and external server support (we won't focus on this as much since there would be additional latency)
* generic breaker rules (a yml or json based templating language)
* linking with public platforms (gcp, aws, azure) so their alarms can be used as part of a rule
* Fallback path, multiple routes
* healthchecks

Later:
* Dashboard
* predictive insights based on metrics behavior
* Run time series models on metrics data possibly?
* Load tests


### Installation
TODO

### Setup
TODO

### Usage
* HTTP request based: CuRL it, use language-native libraries, shouldn't matter

### Example
TODO

### License
MIT License


