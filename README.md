# Bamazon

## Bamazon isa shopping app that helps customer/manager/supervisor to shop/list/manage products

### Node packages installed in this 
* Inquirer
* mySql


Before running the js file use terminal to install the above mentioned packages using the command ```` npm i ````

### Customer view!!

#### If the user(customer) wants to shop, the following command should be typed in
```` node bamazonCustomer.js````
###### When this command runs, the inquirer prompt will run and will ask the user to choose an item to buy
##### The following will be happening
![Screenshot](/images/Customer_choice.png)

#### After choosing the product the customer will be prompted for quantity 

##### The following happens
![Screenshot](/images/customer_order.png)


#### If the user types in a quantity > available stock

##### The following will be the output
![Screenshot](/images/customer_insufficient.png)

### Manager View!!

#### If the user(manager) wants to perform his tasks, should run the following command
```` node bamazonManager.js````

###### When this runs the manager will be prompted to choose from four options as the following
![Screenshot](/images/Manager_options.png)

#### If the manager chooses "View products for sale"
##### The following will be the output
![Screenshot](/images/manager_view.png)

#### If the manager chooses "View low inventory"
##### The following will be the output
![Screenshot](/images/manager_lowinventory.png)

#### If the manager chooses "Add to inventory"
##### The following will be the output
![Screenshot](/images/manager_lowinventory.png)

#### If the manager chooses "Add new product"
##### The following will be the output
![Screenshot](/images/manager_addnewproduct.png)


### Supervisor view

####  If the user(supervisor) wants to perform his tasks, should run the following command
```` node bamazonSupervisor.js````

###### When this runs the manager will be prompted to choose from following options 
* view products for sale
* Add new department
* Quit

#### If the supervisor chooses "view products for sale"
##### The following will be the output
![Screenshot](/images/supervisor_view.png)

#### In all the views, if "Quit" is chosen the database connection ends and the app quits!s