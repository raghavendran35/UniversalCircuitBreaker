# AgnosticCB

## CX input: service names + ip addresses + monitoring account (typically ties to CSP)

aws, gcp, azure

Onboarding process:

Share service hosts, asg(s), etc.

We import your alarms list (w/ permission) and request the critical ones you care about per service


CB behavior scenarios:
critical issue, need fallback path
OR
fallback to different hosts during some outage



Customer should also share service flows. Pseudo requests for various flows

We can run load tests, health checks, tracer bullets periodically


## Goal: Don't be reactive, be proactive

CB decision: 

predictive insights based on metrics behavior
Run time series models on metrics data possibly?


Eventually, set up CB to fall back hosts. Allow to dynamically assign more hosts


