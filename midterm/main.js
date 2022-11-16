// const imp = require('./implementation.js');

// imp.register("test4", "123",imp.callback)
// //.then(() => imp.createABlog("blog1",imp.callback))
// .then(()=>imp.createPost("blogName", "content","blog1",imp.callback))
// const fs = require("fs");

// fs.writeFile("test.txt","content",(err)=> {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("finished");
//     }
// })

// console.log("Im a simple message")

const {argv} = require('process');

const x1 = argv[2];
const x2 = argv[3];
const x3 = argv[4];
const x4 = argv[5];
console.log(x1,x2,x3,x4)