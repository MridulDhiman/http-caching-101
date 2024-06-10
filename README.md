# HTTP Caching

Response for a particular response is saved onto the main memory, and on subsequent requests for the same resource, the response is directly acquired from cache. Thus, saving time from processing request in server, which involves:
1. Parsing the request from json (deserializing request) 
2. routing the request to particular endpoint
3. querying database for user data


There are 2 types of HTTP cache: 
1. private cache
2. shared cache 

### Private Cache 

It is a cache associated with a particular client, and is not shared among other clients. Cache used to store personalized content for a particular user and not to be shared among other users.

It is browser cache, where the browser requests are cached only on the browser, and in not other caching infrastructure between the client and server.

Examples of shared caches among different clients in request-response lifecycle: 

1. Let's say, client makes a HTTP request in `/user/data` endpoint, and gets response, this response can be saved in CDN server (which is located closest to user's location), for getting faster response. 

2. Let's assume a reverse proxy e.g. nginx, may forward HTTP requests from port 80 to your backend server. So,  client will actually make a request to reverse proxy and it will forward the request to backend server, and the response can be cached by reverse proxy server, so that further request may not need to be forwarded and just be handled from the cache stored in the reverse proxy server.

The above examples, show how cache can be stored in different clients, but if we want to prevent that and store the cached response only in the browser, we can do that using `Cache-Control: private` specified in the response header.

---

> Whenever we reload our browser and make a new GET request to a particular endpoint, new TCP connection with that request gets created.

In our example, we have `/user` endpoint with JSON response.

#### Workflow:
1. Make a new request by hitting: `http://localhost:3000/user` on browser.
2. In server we have setup Cache-Control header.
```javascript
{ 
    "Cache-Control" : "private, max-age=86400", // 1 day
    "Expires": new Date(Date.now() + 86400000).toUTCString() // cache will expire in 1 day
     } 

```
3. So, the result will be cached in the browser.
4. To, see if result is cached or not, we can do that by opening up a TCP connection with `http://localhost:3000` endpoint.
5. Now, if we go `/user` in this session, it will return us the cached result, if is not yet expired yet.


*Original Response*:  

![Original Response](images/image-2.png)

*Cached Response*: 

![Cached Response](images/image-1.png)


--- 



## Shared Cache

It is cache that can be shared among other users and is located between client and server (as a proxy, cdn server etc.). 

It is also of two types: 
1. Proxy Cache
2. Managed Cache


## Proxy Cache 

