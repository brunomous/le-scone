const cacheName = 'static-v1'

const cacheAssets = [
  'index.html',
  'css/style.css',
  'js/main.js',
]

self.addEventListener('install', (event) => {
  console.log('Installation event: ', event)

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('Activation event: ', event)

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              return caches.delete(cache)
            }
          })
        )
      })
  )
})

self.addEventListener('fetch', event => {
  console.log('Fetch event: ', event)

  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  )
})
