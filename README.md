# Hw_9_bamazon

### Overview
This is an Amazon-like storefront with the MySQL coding. The app will take in orders (product id and qty) from customers and deplete stock from the store's inventory. 

#### 1. Customer view:
    
    1. Created a MySQL Database called bamazon. Create a table called products and it has item_id, product_name
        dept_name, price and qty of the procuts.

    2. created a Node application called customer.js. First, it will show all the products details from the 
       product table and then 
        * It will ask them the ID of the product they would like to buy.
        * AND how many units of the product they would like to buy.

    3. Once the customer has placed the order, the application checks if the store has enough of the product to       meet the customer's request.
    
        * If yes, it will ask user to confirm if they like to place the order. If user does confirm then
            - it will update the SQL database to reflect the remaining quantity.
            - And Once the update goes through, it will show the customer the total cost of their purchase.

        * If the store does not have enough qty, the app logs a phrase like "Insufficient quantity!", and then..
            - Asks user if they want to start over or quit. If the user decide to start over, the whole process      starts over or user gets out of the app by picking quit.
