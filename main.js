const fs = require("fs");

const arr = [ 'file1.txt','file2.txt','file3.txt','file4.txt'];

for(let i=0; i<arr.length-1;i++){
    fs.writeFile(`${arr[i]}`,`${arr[i+!]}`,(err) => {
        if(err){
            console.log(err);
        }
    })
}
fs.writeFile(`${arr[3]}`,"this is the end",(err) => {
    if(err){
        console.log(err);
    }
})
fs.read('file1.txt',(err)=>{
    if(error){}else{
        fs.read('file2.txt',(err)=>{
            if(err){}else{
                fs.read('file3.txt',(err)=>{
                    if(err){}else{
                        fs.read()
                    }
                })
            }
        })
    }
})