const { EOL } = require("os");

const fs = require("fs").promises

//[Meal Type] [Meal Name] [Meal Quantity] [Price]
const listOfFood = [];
const readCSV =  () => {
    return fs.readFile("menu.csv", "utf-8")
    .then((content) => content.split(EOL));
};
const mapOfFood = new Map();
// const mealGroup = {"lunch":[{mailName:"bento box"......}],
// "dinner": [{mailName:"bento box"......}]}

const formatFood = (foodArr) => {
    foodArr.foreach(element =>{      
        elementArr = element.split(',')
        const food = {type:elementArr[0], name:elementArr[1], quantity:elementArr[2], price:elementArr[3]};
        if(mapOfFood.has(food.type)){
            mapOfFood.get(food.type).push(food);
        }else{
            mapOfFood.set(food.type,[food]);
        }
    })
    return mapOfFood;
}

const outputMenu = (mapOfFood) => {
    mapOfFood.foreach(element => {
       console.log(element);
    })
}