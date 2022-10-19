// const addCalc = (num1, num2) => num1 + num2;
// const subCalc = (num1, num2) => num1 - num2;

// const addOpertatoin=addCalc;
// const subOperation=subCalc;
// const calc = (num1, num2, operation) => operation(num1,num2);

// console.log(calc(2,3,addOpertatoin));
// const colors = ["blue","red","green"];
// const callback = (value) =>{
//         console.log(value);
// }
// const myForEach = (list, callback)=>{
//   for(let i=0;i<list.length;i++){
//     callback(list[i]);
//   }
// }

// myForEach(colors,callback);
const cb = (err, result) => {
    if(err){
        console.log(err);
    }
    if(result){
        console.log(result);
    }
}

const multiplier = (num1, num2, callback) => {
    if (typeof num1 != "number" || typeof num2 != "number"){
        callback("error",null);
    }else{
        callback(null,parseInt(num1)* parseInt(num2));
    }
}

multiplier("a","b",cb);