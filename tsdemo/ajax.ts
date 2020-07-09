const ajax = (url = '', method = 'GET') => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && (/^[23]\d{2}$/.test(String(xhr.status)))) {
        resolve(xhr.responseText)
      }
    }
    xhr.onerror = (err) => {
      reject(err)
    }
    xhr.send()
  })
}