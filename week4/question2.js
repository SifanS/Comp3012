//Sifan Sun A01034484
const fs = require("fs").promises;
const { EOL } = require("os");


const processAndFormat = (csv) => {
    return fs.readFile(csv, "utf8").then(data => {

        // create a meals object to group meal types (ex - { lunch: [x,y,z], dinner: [x,y,z]})
        const meals = {};
        // split data by end of line (Don't forget to use EOL!)
        const dishes = data.split(EOL);
        // loop through array of meals
        for (let i = 0; i < dishes.length; i++) {
            // Split each string by comma
            let element = dishes[i];
            [dishType, dishName, dishQuantity, dishPrice] = element.split(",");
            //   Create a meal object containing { name, quantity, price }
            const dish = { name: dishName, quantity: dishQuantity, price: `$${(parseFloat(dishPrice.split('$')[1]) * 1.8).toFixed(2)} ` };

            // Check if the mealType is already in the meals object
            // if false...create array, push into array, and insert array into meals obj
            if (!(dishType in meals)) {
                meals[dishType] = [dish];
            } else {
                //   if true...then push it into the array
                meals[dishType].push(dish);
            }

        }


        // Create an empty string called formattedContent
        let formattedContent = '';
        // Loop through meals object
        for (const key in meals) {
            // Get meal type (object key)...upperCase it...append it to formattedContent string
            formattedContent += `...${key.toUpperCase()}...\r\n`;
            // loop through array corresponding to mealType and append to formattedContent
            for (let i = 0; i < meals[key].length; i++) {
                const m = meals[key][i];
                formattedContent += `${m.price} ${m.name}, ${m.quantity}${EOL}`;
            }
        }
        // return the formattedContent
        return formattedContent;

    })
}

processAndFormat("menu.csv")
    .then(formattedContent => fs.writeFile("menu.txt", formattedContent))
    .then(() => console.log("Program Complete"))
    .catch(err => console.log(err.message));