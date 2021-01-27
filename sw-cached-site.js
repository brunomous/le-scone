const cacheName = 'static-v2'

self.addEventListener('install', (event) => {
  console.log('Installation event: ', event)
})

self.addEventListener('activate', (event) => {
  console.log('Activation event: ', event)

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Clearing old caches.')
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
      .then(res => {
        const resClone = res.clone()
        caches.open(cacheName)
          .then(cache => {
            cache.put(event.request, resClone)
          })
        return res
      })
      .catch(
        () => caches.match(event.request)
          .then(res => res))
  )
})
