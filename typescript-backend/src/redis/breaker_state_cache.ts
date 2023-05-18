import { CircuitBreakerStates } from "../circuitbreaker/circuit_breaker_gateway";

export class RedisBreakerStateCache {
    private ttl?: number;
    // TODO: this record should be more generic?
    // Could be simply: breaker-id: state
    private _cache: Record<any, any>

    // singleton is anti-pattern...
    private static _instance: RedisBreakerStateCache;
  
    constructor(ttl?: number) {
      // [1] define ttl and create redis connection
      this.ttl = ttl;
      // Trigger run of PolicyEngine, RuleEvaluator, etc. which should update application cache
      this._cache = { breaker_id_1: open}
    }

    get cache(): Record<any, any> {
        return this._cache;
    }

    public static getRedisBreakerStateCache(ttl?: number) {
        return this._instance || (this._instance = new this(ttl));
    }

    getBreakerStatus(breakerId: string) {
      return this._cache[breakerId];
    }

    // to avoid startup race conditions of being null or something, default to OPEN
    setBreakerStatus(breakerId: string) {
      this._cache[breakerId] = CircuitBreakerStates.OPEN;
    }

  }