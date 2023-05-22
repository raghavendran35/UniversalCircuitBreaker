### Repro Steps

#### Step 0
* First follow the necessary steps to install Redis: https://redis.io/docs/getting-started/

#### Firstly, start up the cluster
* Run `redis-server`
Then, in a separate terminal, run
`redis-cli ping`
`> PONG`
Then, run commands (assuming you run `redis-cli`) like
```
redis 127.0.0.1:6379> set mykey somevalue
OK
redis 127.0.0.1:6379> get mykey
"somevalue"
```

#### Now, the streams
For the hits/misses storing, we'll use streams: https://redis.io/docs/data-types/streams-tutorial/. Assuming, you run `redis-cli`
```
redis 127.0.0.1:6379> XADD mystream * key1 value1 key2 value2
"1684722745507-0"
```
Breaking down the above, streams are append only and the command is XADD. This returns
* first arg: "mystream", the key for the stream
* second arg: "star", entry ID, for now, we can pass as so because it would be auto-generated and monotonically increasing
* next args: key-value pairs
* returns: <millisecondsTime>-<sequenceNumber>

Other commands:
```
redis 127.0.0.1:6379> XLEN mystream
1
```

Now, time for look up. For Universal CB, we should treat this as a time series store. To get all the items, we need to pass in start and end as:
```
redis 127.0.0.1:6379> XRANGE mystream - +
1) 1) "1684722745507-0"
   2) 1) "key1"
      2) "value1"
      3) "key2"
      4) "value2"
2) 1) "1684723163983-0"
   2) 1) "key1"
      2) "value4"
      3) "key2"
      4) "value3"
3) 1) "1684723197177-0"
   2) 1) "key1"
      2) "value6"
      3) "key2"
      4) "value8"
```

And, for the specific stored field-value pair between a certain time range:
```
> XRANGE mystream 1684722745507 1684723197177
```
  
And, to get the last item in the stream:
```
> XREVRANGE mystream + - COUNT 1
```

#### Call-outs
* Redis commands go to port 6379. Can be overriden. 
* Universal CB can follow a very simple schema for now, just store `result -> (Success or Failure)` for each item in the stream
