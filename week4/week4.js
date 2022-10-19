const { rejects } = require("assert");
const { resolve } = require("path");

const fs = require("fs").promises;


const content = '1 2 3 4 5 6 7 8 9 10';
const fileName = "spacedNumbers.txt";


function filterNumbers(arr) {
    return arr.filter((num) => num %2===0);
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] % 2 == 0) {
    //         fs.appendFile("filteredNumbers.txt", arr[i] + '\ ');
    //     }
    // }
}

// const getSpacedData =  (fileName, fileContent)=> {
//     return new Promise((res,rej)=>{
//         fs.writeFile(fileName, fileContent, (err) => {
//             if(err){
//                 reject(err);
//             }else{
//                 fs.readFile(fileName,"utf-8", (err, data) => {
//                     if(err){
//                         reject(err);
//                     }else{
//                         resolve(data.split(' '));
//                     }        

//                 })
//             }
//         })
//     })
// }

// const getSpacedData = (fileName, fileContent) => {
//     return new Promise((res, rej) => {
//         fs.writeFile(fileName, fileContent)
//             .then(() => fs.readFile(fileName, "utf-8"))
//             .then((content) => content.split(' '))
//             .then((arr) => resolve(arr))
//             .catch((err) => rejects(err))
//     })
// }

function getSpacedData(filename,content) {
  //Promise.reject(new error("filename type eror"));
   return fs.writeFile(filename, content)
        .then(() =>  filename);}

function readData(filename) {
    return fs.readFile(fileName, "utf-8")
    .then((content) => content.split(' '));
}

getSpacedData(fileName,content)
    .then((arr) => filterNumbers(arr))
    .then(evenlist => fs.appendFile("filteredNumbers.txt",evenlist))
    .catch((err) => console.log(err));
