var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var dbconfig = require('./config/database');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

// test app running
app.get('/', function(req, res) {
    res.send("Medicool server is running");
});

// show medicines
app.get('/showmedicines',function(req,res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  connection.query('SELECT * FROM `medicines_t`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results);
  });
  connection.end();
});

// search medicine by name
app.post('/search_medicine', function(req, res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  connection.query('SELECT * FROM `medicines_t`', function (error, results, fields) {
    if (error) throw error;
    var drug = results.find(function(element){
        return (element.m_name === req.body.searchText && element.m_availability === req.body.searchCity)
    });

    if(drug !== undefined)
    {
        return res.json(drug);
    }
    else
    {
        return res.sendStatus(401);
    }
  });
  connection.end();
  });

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
