import assert from 'assert';
import { RedisClientType, createClient } from 'redis';
import { RedisBreakerStateCache } from './breaker_state_cache';

// TODO: See if there is a better way to deal with this
let redisClient: any;
let redisBreakerStateCache: any;

async function check_health(redisClient: RedisClientType) {
    await redisClient.connect();
    await redisClient.set('key', 'value');
    const value = await redisClient.get('key');
    assert(value === 'value')
}

export function init_redis() {
    // Check that Redis DB is healthy and is actually running
    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));
    check_health(redisClient);

    redisClient = client;

    // handles initialization of breaker state cache
    redisBreakerStateCache = RedisBreakerStateCache.getRedisBreakerStateCache();

    // TODO: also note that on server startup, we'll need to re-initialize cache
    return redisClient;
}