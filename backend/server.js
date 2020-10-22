import cors from 'cors';
import express from 'express';
import mysql from 'mysql'; 

const app = express();


var con = mysql.createPool({
  host: "us-cdbr-east-02.cleardb.com",
  user: "bfa546afba69ce",
  password: "16962866",
  database: "heroku_a9046155c2a5415"

});
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
 
app.get('/', function (req, res) {
  var sql= "SELECT * FROM productsdata"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  }); 
}) 
app.get('/login', function (req, res) { 
  var sql= "SELECT firstname, emailAddress, password FROM customers"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
 }) 
 if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('frontend/build'));

  // Express serve up index.html file if it doesn't recognize route
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} 
app.post('/cart',function(req,res){
  console.log(req.body);
  res.send(req.body);
})
app.post('/register',function(req,res){ 

    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
 
  var sql = "INSERT INTO customers (firstname, lastname, emailAddress, password) VALUES (?, ?, ?, ?)";
  con.query(sql,  [firstName,lastName,email,password], function (err, result) {
    if (err) throw err;
    res.send(result);
    console.log("1 record inserted");
  });  
})
app.listen(port,()=>{
  console.log('port 5000 created')
})