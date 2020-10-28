import cors from 'cors';
import express from 'express';
import mysql from 'mysql'; 
import dotenv from "dotenv";
dotenv.config();
const app = express();


// var con = mysql.createPool({
//   host: "us-cdbr-east-02.cleardb.com",
//   user: "bfa546afba69ce",
//   password: "16962866",
//   database: "heroku_a9046155c2a5415",
//   port: "3306"
// }); 
var con = {
  host: "us-cdbr-east-02.cleardb.com",
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: "heroku_a9046155c2a5415",
  port: "3306"
}; 
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(con); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
// var con = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "ecommerce",
//   port: "3306"
// }); 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE productsdata (id VARCHAR(255), title VARCHAR(255), desc VARCHAR(255), price VARCHAR(255), image VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
 
app.get('/api', function (req, res) {
  var sql= "SELECT * FROM productsdata"
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result); 
  }); 
}) 
app.get('/api/login', function (req, res) { 
  var sql= "SELECT firstname, emailAddress, password FROM customers"
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result); 
  });
 }) 
 if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('frontend/build'));

  // Express serve up index.html file if it doesn't recognize route
  
  app.get('/api/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} 
app.post('/api/cart',function(req,res){
  console.log(req.body);
  res.send(req.body);
})
app.post('/api/register',function(req,res){ 

    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
 
  var sql = "INSERT INTO customers (firstname, lastname, emailAddress, password) VALUES (?, ?, ?, ?)";
  connection.query(sql,  [firstName,lastName,email,password], function (err, result) {
    if (err) throw err;
    res.send(result); 
  });  
})
app.listen(port,()=>{
  console.log('port 5000 created')
})