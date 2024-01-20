const rootPath = ''
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
    console.warn(rootPath, route.path, query)
    history.pushState({}, '',rootPath + route.path + query)
  }
})