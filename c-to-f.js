console.log('Celsius to Fahrenheit')
// const Celsius = 30
//should be func
const Fahrenheit = (Celsius) => (Celsius * (9 / 5) + 32).toFixed(2)
// console.log(Fahrenheit(10))

// console.log(process.argv) ==> comment to get value globaly as it will return in array..we are giving index val as [2]
// console.log(Fahrenheit(process.argv[2]))

//array destucturing
const [, , Celsius] = process.argv;
console.log(Fahrenheit(Celsius))

const Timestamp = Date.now();
console.log(Timestamp)

