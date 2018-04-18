var inquirer = require("inquirer");
var mysql = require("mysql");

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

        // var chosenID;
        // var chosenQty = answer.userinputQty;

        var query = "SELECT * FROM products";
        connection.query(query, function (err, res) {
            if (err) throw err;           
                    for (var i = 0; i < res.length; i++) {                        
                        var chosenID;
                        if (res[i].item_id == answer.userinputID) {                             
                            chosenID = res[i];                           
                        }                        
                    }   
                    if (chosenID.stock_qty > answer.userinputQty) {
                        console.log(chosenID.stock_qty);
                        console.log("Great!! We have it in stock.");
                    }            
                    else{
                        console.log("Sorry!! Insufficient Inventory.");
                    }
        
                       

        });//line 68 connection.query ends here.

    });// line 62 1st .then (answer) function ends here.

}// line 38 userinput() function ends here.




            