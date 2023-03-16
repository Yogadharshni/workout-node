const fs=require("fs")


// const quote='Be the best version of you'

//to create file
// fs.writeFile("./quote.html",quote,(msg)=>{
//     console.log('created successfully')
// })


// // to create 10 files automatically in backup folder
// for(let i=1;i<=10;i++){
//     fs.writeFile(`./backup/text-${i}.html`,quote,(msg)=>{
//         console.log('created successfully')
//     })
// }


// //enter how many files we need in console

// let n=10
// const filefnc=(n)=>{
// for(let i=1;i<=n;i++){
//     fs.writeFile(`./backup/quotes-${i}.html`,quote,(msg)=>{
//         console.log('created successfully')
//     })
// }
// }
// // console.log(filefnc(process.argv[2]))

// //to read file
// fs.readFile('./backup/text-1.html','utf-8',(err,data)=>{
//     if(err){
//         console.log('Error occured',err)
//     }else{
//         console.log(data)
//     }
// })

//to append or to add something in file
// const quote='Everything happens for a reason'

// fs.appendFile('./fun.html','\n'+ quote,(data)=>{
//     console.log('Appended!!!')
// })

//to delete file
fs.unlink('./delete.css',(err)=>{
    console.log('Deleteddd!!!')
})