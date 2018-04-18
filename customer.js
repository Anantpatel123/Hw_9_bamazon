var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');// format table in command line

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    allProducts();
});


function allProducts() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("See current inventory below.");
        console.log("-------------------------------------------");
        console.log("ID  Product Name, Price");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ")  " + res[i].product_name + "      " + res[i].price);
        }
        userInput();
    });
}


function userInput() {
    inquirer.prompt([
        {
            message: "Please enter the productID you like to buy.",
            name: "userinputID",
            type: "input",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } 
                else {
                    return false;
                }   
            }
        },
        {
            message: "Please enter the quantity.",
            name: "userinputQty",
            type: "input",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function (answer) {

        var chosenID = answer.userinputID;
        var chosenQty = answer.userinputQty;

        var query = "SELECT * FROM products";
        connection.query(query, function (err, res) {
            if (err) throw err; 

            for (var i = 0; i < res.length; i++) {                        
                var varID;
                if (res[i].item_id == answer.userinputID) {                             
                    varID = res[i];                           
                }                        
            }      

            if (varID.stock_qty > (chosenQty)) {
                console.log("Great!!! We have that product in stock.");

                    inquirer.prompt
                    ({
                        name: "choice",
                        type: "rawlist",
                        message: "Would you like to place this order yes or no?",
                        choices: ["YES", "NO"]
                    })
                    .then(function(answer) {
                        if (answer.choice === "YES") {

                            var updateQtyQuery = "UPDATE products SET stock_qty =" + (varID.stock_qty - chosenQty) + " WHERE item_id = " + chosenID;
                            
                            connection.query(updateQtyQuery, function (err, res) 
                            {
                            if (err) throw err;
                            console.log("Congratulation! Your order has been placed.")
                            console.log("Your total cost of the purchase is $", (varID.price * chosenQty));
                            });
                            
                            connection.end(); 
                        }
                        else {
                            StartoverQuit();
                        } 
                        }); //line 88 .then(function(answer)) ends here.
                    
            } // line 78 if stock_qty > chosenqty ends here.
                
            else {
                console.log("Sorry!!! Insufficient quantity!");
                StartoverQuit();
            }                         

        });//line 68 connection.query ends here.

    });// line 62 1st .then (answer) function ends here.

}// line 38 userinput() function ends here.


function StartoverQuit(){
    inquirer.prompt
    ({
        name: "choice2",
        type: "rawlist",
        message: "Would you like to Start over or Quit ?",
        choices: ["Start Over", "Quit"]
    }).then(function(answer) {
        if (answer.choice2 === "Start Over") {
            allProducts();
        }
        else {
            connection.end();
        }
    });    
}


          