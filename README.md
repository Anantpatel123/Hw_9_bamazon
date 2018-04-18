# Hw_9_bamazon

### Overview
This is an Amazon-like storefront with the MySQL coding. The app will take in orders (product id and qty) from customers and deplete stock from the store's inventory. 

#### 1. Customer view:  See below demo for customer view..
    
    1. Created a MySQL Database called bamazon. Create a table called products and it has item_id, product_name
        dept_name, price and qty of the procuts.

    2. created a Node application called customer.js. First, it will show all the products details from the 
       product table and then 
        * It will ask them the ID of the product they would like to buy.
        * AND how many units of the product they would like to buy.

    3. Once the customer has placed the order, the application checks if the store has enough of the product
        to meet the customer's request.
    
        * If yes, it will ask user to confirm if they like to place the order. If user does confirm then
            - it will update the SQL database to reflect the remaining quantity.
            - And Once the update goes through, it will show the customer the total cost of their purchase.

        * If the store does not have enough qty, the app logs a phrase like "Insufficient quantity!", and then..
            - Asks user if they want to start over or quit. If the user decide to start over, the whole 
              process starts over or user gets out of the app by picking quit.


#### 2. Manager view:   See below demo for manager view.
    
    1. created a Node application called Manager.js. First, it will show list a set of menu options: 
       
        * View Products for Sale.
            - will list every available item: item_id, names, prices and stock qty.

        * View Low Inventory.
            - will list all items with an inventory count lower than 5.

        * Add to Inventory.
            - will display a prompt that will let manager "add more" of any item currently in the store.

        * Add New Products.
            - will allow manager to add new product to the store.



Here's the link to my Demo video
<a href ="https://drive.google.com/open?id=1ctABKGHqnN0iczwkXy9nlIT3IQexIA8L">Click here for Demo</a>