const myAppName = "restaurant-reviews-"
const allCacheName = myAppName + "1.0";

var allcac = [
  allCacheName,
];
//chache all files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(allCacheName).then(function(cache) {
      return cache.addAll([
        '/index.html', 
        '/restaurant.html',
        //css files
        '/css/styles.css',
        //js files
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'js/register.js', 
        //data files
        'data/restaurants.json',
        // img files
        //'/img/*'
      ]);
    })
  );
});
// delete any old  cache if the name not match the current 
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith(myAppName) && //should start with your app name
                 !allcac.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
// fetch listener
self.addEventListener('fetch', function(event) {
  const requestUrl = new URL(event.request.url);// open resturent.html that chach in cache storge
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
      event.respondWith(caches.match('/restaurant.html'));
      return; 
    }
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});