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
.then(function(res) {
  
  // var quantity = res.quantity;
//   console.log(ID)
  // console.log(quantity);
  qCheck(res.ID, res.quantity);
});
  }

  function qCheck(userID, userQuantity) {
    connection.query("SELECT * FROM products WHERE id= ?",[userID], 
    
    function(err, res) {
      if (err) throw err;
    //   for (i=0; i < res.length; i++){
         
        // console.log(res[i]);

        // console.log(res[i].stock_quantity);
     var newAmount =  res[0].stock_quantity - userQuantity

      console.log(res[0].stock_quantity);


      updateProduct(userID, newAmount);
      connection.end();
      console.log(res)
      // console.log("\n");
       
      
    });
  }

//   [{
//     id: id,
//     stock_quantity: stock_quantity
//   }],
function updateProduct(id, q) {
    
    console.log("Updating quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
            stock_quantity: q
        },
        {
          id: id
        }
      ],
      function(err, res) {
      
        // console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
       
      }
    );

   
    }
   