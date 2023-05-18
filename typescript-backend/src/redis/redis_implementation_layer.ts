import assert from 'assert';
import { RedisClientType, createClient } from 'redis';
import { RedisBreakerStateCache } from './breaker_state_cache';
import { ResultsRequestMetadata } from '../models/results_metadata.interface';

export class RedisImplementationLayer {

    // TODO: See if there is a better way to deal with this
    private redisClient: any;
    private redisBreakerStateCache: any;

    // singleton is anti-pattern...
    private static _instance: RedisImplementationLayer;

    public static getRedisImplementationLayer() {
        return this._instance || (this._instance = new this());
    }

    async check_health(redisClient: RedisClientType) {
        await redisClient.connect();
        await redisClient.set('key', 'value');
        const value = await redisClient.get('key');
        assert(value === 'value')
    }

    async set_results_metadata(result: ResultsRequestMetadata) {
        // TODO: populate
        // use this.redisClient
    }

    getRedisClientInstance() {
        return this.redisClient || (this.redisClient = this.init_redis());
    }

    init_redis() {
        // Check that Redis DB is healthy and is actually running
        const client = createClient();

        client.on('error', err => console.log('Redis Client Error', err));

        this.redisClient = client;

        // check health
        this.check_health(this.redisClient);

        // handles initialization of breaker state cache
        this.redisBreakerStateCache = RedisBreakerStateCache.getRedisBreakerStateCache();
    
        return client;
    }

}