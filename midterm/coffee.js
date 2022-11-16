const { EOL } = require("os");

const fs = require("fs").promises;

const nameConversion = (coffeeType) => {
    if (coffeeType === "MR") {
        return "medium-roast";
    } else if (coffeeType === "DR") {
        return "dark-roast";
    } else if (coffeeType === "B") {
        return "blonde";
    } else {
        return Promise.reject(new Error("Coffee type is incorrect"));
    }
}

const viewAllSupply = (coffeeType) => {
    const coffeeTypeFull = nameConversion(coffeeType);
    return fs.readFile("supply.txt", "utf8").then((data) => {
        let supply = {};
        data.split(EOL).forEach(roast => {
            (roast in supply) ? supply[roast]++ : supply[roast] = 1;
        })
        if (supply[coffeeTypeFull]) {
            return supply[coffeeTypeFull];
        } else { return 0; }
    })
}


// (2)
const addSupply = (coffeeType) => {
    const coffeeTypeFull = nameConversion(coffeeType);
    return fs.appendFile("supply.txt", EOL + coffeeTypeFull);
}

// (3)
const deleteSupply = (coffeeType, quantity) => {
    const coffeeTypeFull = nameConversion(coffeeType);

    return fs.readFile("supply.txt", "utf8").then((data) => {
        let supply = data.split(EOL);
        if (quantity === "*") {
            let newSupply = [];
            supply.forEach((coffee) => {
                if (coffee != coffeeTypeFull) {
                    newSupply.push(coffee);
                }
            })
            console.log(`All ${coffeeTypeFull} coffee are deleted`);
            return newSupply.join(EOL);
        } else if (typeof quantity === "number" && parseInt(quantity) <= supply.length) {
            let count = 0;
            let newSupply = [];
            supply.forEach((coffee) => {
                if (coffee == coffeeTypeFull && count < parseInt(quantity)) {
                    count++;
                } else {
                    newSupply.push(coffee);
                }
            })
            console.log(`${count} ${coffeeTypeFull} coffee are deleted`);
            return newSupply.join(EOL);
        } else {
            return new Error("quantity should wither be '*' or a number")
        }
    }).then((data) => fs.writeFile("supply.txt", data))
}

viewAllSupply("MR").then(data => console.log(data))
    .then(() => addSupply("MR"))
    .then(() => viewAllSupply("MR")).then(data => console.log(data))
    .then(() => deleteSupply("MR", 2))
    .then(() => viewAllSupply("MR")).then(data => console.log(data))
    .then(() => deleteSupply("MR", "*"))
    .then(() => viewAllSupply("MR")).then(data => console.log(data))
    .then(() => console.log("Program is completed"))
    .catch((err) => console.log(err.message))
