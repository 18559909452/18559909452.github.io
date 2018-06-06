this.addEventListener('install', function (event) {
  event.waitUntil(updateStaticCache());
});

var staticCacheName = 'static';
var version = 'v1-';

function updateStaticCache() {
  return caches.open(version + staticCacheName)
    .then(function (cache) {
      return cache.addAll([
        '/ubuild.dll.e83e29bc75b60fbb2e3a.js',
        '/',
        '/index.50922793.css'
      ]);
    });
};



this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                console.log('cache:' + event.request.toString());
                return response;
            }

            var request = event.request.clone();
            return fetch(request).then(function (httpRes) {
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open(version + staticCacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
});
