drop database if exists bamazon;
create database bamazon;
use  bamazon;

create table products(
item_id integer auto_increment,
product_name varchar(50),

department_name varchar(50),

price decimal(10,4),
stock_quantity integer(10),
primary key (item_id)
);
insert into products(product_name,department_name,price,stock_quantity)
values("Alexa","Electronics",49.99,15),
("Samsung Galaxy S10","Electronics",689.99,10),
("Car windshiels sunshade","Automative",15,15),
("Car Jump starter","Automative",56.76,10),
("Mini waffle maker","Kitchen appliance",10.25,15),
("Compact Air fryer","Kitchen appliance",49.99,10),
("Women sunglasses","Clothing & Accessories",30,10),
("Men's casual Henley Tshirt","Clothing & Accessories",13.45,10),
("Toddler sock size 3t-4t","Clothing & Accessories",15,20),
("Insulation wire stripping tool","Home Improvement",6.34,10),
("Waterproof fairy string lights","Home Improvement",7,5),
("Puppy toy sets","Pet supplies",13.54,10),
("Pet grooming gloves","Pet supplies",11,7),
("Dog collar with matching leash","Pet supplies",6.43,8),
("Building block toys","Toys",18,9),
("Foam darts for nerf","Toys",7.69,9),
("Mini drone for kids","Toys",19.99,20),
("LOL surprise!series 2","Toys",14.95,10),
("Organic supplements","Health & Personal Care",12.67,30),
("Sleep masks","Health & Personal Care",10.99,15),
("kids supplement Gummy bears ","Health & Personal Care",17.67,8),
("Chickpea pasta","Grocery",9.02,25),
("Matcha Green tea powder","Grocery",10.95,45),
("Trail mix","Grocery",6.87,40),
("Sherpa throw blanket","Home",18.19,10),
("Digital clocks","Home",12.25,5)
