var inquirer = require('inquirer');
var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
  afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.log("\n");
      firstPrompt(res);
      // connection.end();
    });
  }

  function firstPrompt(res){
inquirer
.prompt([
  // Here we create a basic text prompt.
  
  
  {
    type: "input",
    message: "What is the ID of the product you would like to buy?",
    name: "ID"
  },
  {
    type: "input",
    message:"how many units of the product you would like to buy?",
    name:"quantity"
  }
  
  
])
.then(function(response) {
  for(var i = 0; i < res.length; i++){
    console.log(res[0].product_name);
  }
  // var quantity = res.quantity;
  console.log(ID)
  // console.log(quantity);
  // qCheck(ID, quantity);
});
  }

  function qCheck(f, s) {
    connection.query("SELECT ? FROM products", [{
      id: f,
      stock_quantity: s
    }],function(err, res) {
      if (err) throw err;
      for (i=0; i < res.length; i++){
        console.log(res[i].f);

        // console.log(res[i].stock_quantity);
      }
      connection.end();
      // console.log(res)
      // console.log("\n");
       
      
    });
  }
  