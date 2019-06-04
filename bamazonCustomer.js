var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
function start(){
    
    connection.query("select * from products",function(err,data){
        if(err )throw err;
        inquirer
        .prompt([{
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < data.length; i++) {
              choiceArray.push(data[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to buy?",

},
{
    name: "quantity",
    type: "input",
    message: "How much would you like to buy?"
  }
])

    
    
.then(function(answer) {
    // get the information of the chosen item
    var chosenItem;
    for (var i = 0; i < data.length; i++) {
      if (data[i].product_name === answer.choice) {
        chosenItem = data[i];
        console.log(chosenItem)
      }
    }
    if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
        // bid was high enough, so update db, let the user know, and start over
        var updated_quantity= chosenItem.stock_quantity-answer.quantity;
        console.log (updated_quantity);
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: updated_quantity
            },
            {
              item_id: chosenItem.item_id
            }
          ]  ,
          function(error) {
            if (error) throw error;
            console.log("Order placed successfully!");
            console.log("Total cost for your order is  $"+(answer.quantity*chosenItem.price));
          }
        );
      }
      else {
        console.log("Insufficienty Quantity. Only"+ chosenItem.stock_quantity+" left");
        start();

      }
    });
});
}


