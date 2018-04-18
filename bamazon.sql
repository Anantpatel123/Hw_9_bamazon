DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(128),
  dept_name VARCHAR(128),
  price DECIMAL (10,2),
  stock_qty INTEGER (10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("iphone 8", "Cell phones", 799.99, 10);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("iphone x", "Cell phones", 999.99, 10);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Samsung Galaxy s9", "Cell phones", 699.99, 10);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Lenovo ", "Laptops", 599.99, 15);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("HP", "Laptops", 499.99, 20);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Samsung", "Tvs", 1099.99, 50);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Sony", "Tvs", 1299.99, 30);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Tommy shirts", "Clothing", 39.99, 100);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("CK pants", "Clothing", 49.99, 50);

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("RayBan", "Eyewear", 199.99, 30);

