if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw-cached-pages.js')
      .then(register => console.log(register))
      .catch(error => console.log(error))
  })
}
