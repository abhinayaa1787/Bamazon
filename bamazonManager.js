var mysql = require("mysql");
var inquirer = require("inquirer");
 var table=require("console.table")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Aadhav0422!",
  database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

function start(){

    inquirer
    .prompt([
        {
            name:"choice",
            type:"list",
            choices:["View Products for Sale","View low inventory","Add to Inventory","Add New product","Quit"]
        }
    ])
    .then(function(answer){


        switch (answer.choice){

        
        case "View Products for Sale":
        var query=`select * from products`;
        var display="These are the products listed for sale";
            displayTable(query,display);

break;        

        case "View low inventory":
        var query=`select * from products where stock_quantity<5`;
        var display="These are the products with low inventory";
        displayTable(query,display);
        break;



        case "Add to Inventory":
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
              message: "What product would you like to buy to add to the inventory?",
    
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
            // console.log(chosenItem)
          }
        }
          connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity:parseInt(answer.quantity)+chosenItem.stock_quantity            },
                {
                  item_id: chosenItem.item_id
                }
              ]  ,
              function(error) {
                if (error) throw error;
                var query=`select * from products`;
                var display="\n"+answer.quantity+" "+chosenItem.product_name+" added to inventory successfully!"+"\n";

                 displayTable(query,display);



              }
            );
          });
        })
        break;



        case "Add New product":
        connection.query("select * from departments",function(err,data){
inquirer.prompt([
    {
    name:"product_name",
    type:"input",
    message:"What new product do you like to add?"
    },
    {
        name:"department_name",
        type:"rawlist",
        message:"Enter the name of the department",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < data.length; i++) {
            choiceArray.push(data[i].department_name);
          }
          return choiceArray;
        },

        },
        
        {
            name:"price",
            type:"input",
            message:"What is the unit price of the product?"
            },
            {
                name:"stock_quantity",
                type:"input",
                message:"Enter the number of items in stock"
                }
])
.then(function(answer){

  var chosenItem;
  for (var i = 0; i < data.length; i++) {
    if (data[i].department_name === answer.choice) {
      chosenItem = data[i];
      // console.log(chosenItem)
    }
  }

  var sql = `INSERT INTO products SET ?`

connection.query(
sql, {
product_name:answer.product_name,
department_name:answer.department_name,
price:parseFloat(answer.price),
stock_quantity:parseInt(answer.stock_quantity)
},

    function(err) {
        var query=`select * from products`;
        var display="New product added"+" " +answer.stock_quantity+" "+answer.product_name+"\n";
        displayTable(query,display);

    }
  );
});
        });
break;

case "Quit":
connection.end();
break;

default:
console.log("Choose an option to continue");

        }
    });
}
   


function displayTable(query,display){
        var sqlquery= connection.query(query,function(err,res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            console.log("\n"+display+"\n");
            start();

    });

}



