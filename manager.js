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
    start();
});


function start() {
    inquirer.prompt 
    ({
        name: "choice",
        type: "rawlist",
        message: "Please select from below options.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]        
    }).then(function(answer) {
        if (answer.choice === "View Products for Sale"){
            viewAllProducts();
        }
        if (answer.choice === "View Low Inventory"){
            viewLowInventory();
        }
        if (answer.choice === "Add to Inventory"){
            addtoInventory();
        }
        if (answer.choice === "Add New Product"){
            addNewProduct();
        }        
    });
}




function viewAllProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("See current inventory below.");
        console.log("-------------------------------------------");
        console.log("ID  Product Name, Dept Name, Price, stock_qty");
        for (var i = 0; i < res.length; i++) {
            // console.log(parseInt(res[i].stock_qty));
            console.log(res[i].item_id + ")  " + res[i].product_name + "      " + res[i].dept_name +"  " +
             res[i].price + "    " + res[i].stock_qty);
        }
    });
    connection.end();
}

function viewLowInventory() {
    console.log("Below products are running low in stocks.")
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err; 

        for (var i = 0; i < res.length; i++) {                 
            if (res[i].stock_qty <= 5) {                             
                console.log(res[i].item_id + ")  " + res[i].product_name + "      " + res[i].price + 
                "    " + res[i].stock_qty);
            } 
         }                  
    });
    connection.end();
}


function addtoInventory() {
    // viewAllProducts();
    
    inquirer.prompt([
        {
            name: "addInv_id",
            type: "input",
            message: "please enter the ID of the products you want to add inventory for."
        },
        {
            name: "addInv_qty",
            type: "input",
            message: "enter the qty you want to add."
        }
    ]).then(function(answer) {

        var query = "SELECT * FROM products";
        connection.query(query, function (err, res) {
            if (err) throw err; 

            for (var i = 0; i < res.length; i++) {                        
                var varID;
                if (res[i].item_id == answer.addInv_id) {                             
                    varID = res[i];                           
                }                        
            }      

            var total_qty = (parseFloat(varID.stock_qty) +  parseFloat(answer.addInv_qty));   
            
            // console.log("Here's the total qty: ", total_qty);
            var query = connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_qty : total_qty
                },
                {
                    item_id: answer.addInv_id
                }
            ],
                function(err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                    connection.end();
                    }            
            );
            });// 2nd select query
            
        });// 1st select query        
}


function addNewProduct() {
    console.log("Adding a new product...");
    inquirer.prompt([
        {
            message: "Please enter the product name: ",
            name: "prod_name",
            type: "input"            
        },
        {
            message: "Please enter the department name: ",
            name: "dept_name",
            type: "input"            
        },
        {
            message: "Please enter the price of the product: ",
            name: "prod_price",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
        },
        {
            message: "Please enter the total qty of the product: ",
            name: "prod_qty",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
        }
    ]).then(function (answer) {
        var query = connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.prod_name,
                dept_name: answer.dept_name,
                price: answer.prod_price,
                stock_qty: answer.prod_qty
            },function(err,res) {
                if(err) throw err;
                console.log("Your product was entered successfully!");
                connection.end();
            }
        );        
    });    
}