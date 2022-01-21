fetch('https://gist.githubusercontent.com/opheliagame/0e5a61bf8a6654f90f3032d2b8d22f3b/raw/826d9566805b1d9fb3fcc5ba4e7038648f45fc1d/sign.json')
.then(response => response.json())
.then(data => {
  const sign = data.sign
  console.log(...sign)
})