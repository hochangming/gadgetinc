"use strict";

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _mysql = _interopRequireDefault(require("mysql"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var con = {
  host: "us-cdbr-east-02.cleardb.com",
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: "heroku_a9046155c2a5415",
  port: "3306"
};
var connection;

function handleDisconnect() {
  connection = _mysql["default"].createConnection(con); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to

  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.

  connection.on('error', function (err) {
    console.log('db error', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();
var port = process.env.PORT || 5000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.get('/api', function (req, res) {
  var sql = "SELECT * FROM productsdata";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.get('/api/login', function (req, res) {
  var sql = "SELECT firstname, emailAddress, password FROM customers";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(_express["default"]["static"]('frontend/build')); // Express serve up index.html file if it doesn't recognize route

  app.get('/api/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.post('/api/cart', function (req, res) {
  console.log(req.body);
  res.send(req.body);
});
app.post('/api/register', function (req, res) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  var sql = "INSERT INTO customers (firstname, lastname, emailAddress, password) VALUES (?, ?, ?, ?)";
  connection.query(sql, [firstName, lastName, email, password], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.listen(port, function () {
  console.log('port 5000 created');
});