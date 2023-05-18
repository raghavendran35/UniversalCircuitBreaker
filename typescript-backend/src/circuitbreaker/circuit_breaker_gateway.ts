import { RedisBreakerStateCache } from "../redis/breaker_state_cache";

export enum CircuitBreakerStates {
    OPEN,
    CLOSED,
    HALF_OPEN,
}

export class CircuitBreakerGateway {
    private redisBreakerStateCache: any;

    // singleton is anti-pattern...
    private static _instance: CircuitBreakerGateway;

    getRedisBreakerStateCache() {
        return this.redisBreakerStateCache;
    }

    public static getCircuitBreakerGateway() {
        return this._instance || (this._instance = new this());
    }

    checkStateForBreakerId(breakerId: string) {
        let redisBreakerStateCache: RedisBreakerStateCache = this.redisBreakerStateCache;
        return redisBreakerStateCache.getBreakerStatus(breakerId);
    }

    init_breaker_gateway() {
        this.redisBreakerStateCache = RedisBreakerStateCache.getRedisBreakerStateCache();
    }
}