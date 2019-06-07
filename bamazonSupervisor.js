var mysql = require("mysql");
var inquirer = require("inquirer");
//  var table=require("console.table")
var sql_mode='';
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
            choices:["View Product Sales by Department","Add department","Quit"]
        }
    ])
    .then(function(answer){

switch(answer.choice){
case "View Product Sales by Department":
displayTable();
break;

case "Add department":
addDept();
break;

case "Quit":
connection.end();
break;

default:
console.log("Choose an option to continue");
}
});
}
function displayTable(){
    connection.query(
"SELECT d.department_id,d.department_name,d.over_head_costs,COALESCE(SUM(p.product_sales),0) as product_sales,(COALESCE(SUM(p.product_sales),0)- d.over_head_costs) as total_profit from departments d  left outer join products p on d.department_name=p.department_name GROUP BY p.department_name"
, function(error,res) {
        if (error) throw error;
console.table(res);
 start();

})
 
}
function addDept(){
    inquirer.prompt([
        {
            name:"dept_name",
            type:"input",
            message:"What is the name of the department?"
        },
        {
            name:"over_head_costs",
            type:"input",
            message:"What is the department's over head costs?"

        }

    ]).then(function(answer){
        connection.query(
            "insert into departments set  ?",
            {
                department_name:answer.dept_name,
                over_head_costs:answer.over_head_costs,
            },function(err){
            if(err) throw err;
        

            else{
                // connection.query("select * from departments",
                // function(err,res){
                //     if (err) throw err;
                //     console.table(res)
                // })
                displayTable();
            }
         }
        
        )

    })

}