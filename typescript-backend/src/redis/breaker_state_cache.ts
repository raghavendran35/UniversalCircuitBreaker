export class RedisBreakerStateCache {
    private ttl?: number;
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

  }