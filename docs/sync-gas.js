const env = await fetch('env.json').then(it => it.json())

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
    history.pushState({}, '',`${env.rootPath + query}#${route.path}` )
  }
})
window.addEventListener('load', () => {
  document.getElementById('gas-frame').src = `${env.gasURL}#${location.pathname.replace(env.rootPath, '')}`
})