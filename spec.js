const os=require('os')

// 1kb =1024 bytes
// 1 MB = 1024 KB
// 1 GB = 1024 MB

console.log('Memory in GB',os.freemem()/1024/1024/1024)

console.log("Version",os.version())
console.log("CPU",os.cpus())


