const cache_name = 'defaultCache_1172310e-389a-48c8-85ac-95674facdbf8';

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (cache_name !== key) {
          return caches.delete(key);
        }
      }));
    })
  )
});

//Cache-first policy for all resources
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cache_name).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});


