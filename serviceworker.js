this.addEventListener('install', function (event) {
  event.waitUntil(updateStaticCache());
});

var staticCacheName = 'static';
var version = 'v1-';

function updateStaticCache() {
  return caches.open(version + staticCacheName)
    .then(function (cache) {
      return cache.addAll([
        '/path/to/javascript.js',
        '/path/to/stylesheet.css',
        '/path/to/someimage.png',
        '/path/to/someotherimage.png',
        '/',
        '/offline'
      ]);
    });
};
