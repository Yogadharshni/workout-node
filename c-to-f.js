console.log('Celsius to Fahrenheit')
const Celsius=100
//should be func
const Fahrenheit=(Celsius)=> (Celsius * (9/5)  + 32).toFixed(2)
// console.log(Fahrenheit)

console.log(Fahrenheit(process.argv[2]))
