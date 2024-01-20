// repository name
const rootPath = '/ham-hbr'
const gasURL = 'https://script.google.com/macros/s/AKfycbyPW8USRRrM5tZ5s2aV4QBJSbAO6gxgQElKIP2qXi16QAo--jIOIb93d7lT99ud6R-pcg/exec'
window.addEventListener('message', (event) => {
  if (event.data?.type === 'after-each') {
    const route = JSON.parse(event.data.value)
    const query = Object.keys(route.query).reduce((previousValue, currentValue) => {
      if (previousValue) {
        previousValue += '&'
      } else {
        previousValue += '?'
      }
      return previousValue + `${currentValue}=${route.query[currentValue]}`
    }, '')
    history.pushState({}, '',rootPath + route.path + query)
  }
})

document.getElementById('gas-frame').src = gasURL + '#' +location.pathname.replace(rootPath, '')