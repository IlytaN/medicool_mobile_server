var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var dbconfig = require('./config/database');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(cors());
// test app running
app.get('/', function(req, res) {
    res.send("Medicool server is running");
});

// show medicines
app.get('/showmedicines',function(req,res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  connection.query('SELECT m_id, m_name, m_photo FROM `medicines_t`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results);
  });
  connection.end();
});

// showallPharmacies
app.get('/showallPharmacies',function(req,res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  connection.query('SELECT * FROM `pharmacies_t`', function (error, results, fields) {
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
  connection.query('SELECT * FROM `buy_med_t` JOIN `pharmacies_t` on buy_med_t.fk_p_id=pharmacies_t.p_id;', function (error, results, fields) {
    if (error) throw error;
    var founddrugs = [];
    for (var i = 0; i < results.length; i++) {
      if (results[i].med_name === req.body.searchText && results[i].p_city === req.body.searchCity) {
        founddrugs.push(results[i]);
      }
    }
    if(founddrugs.length !== 0)
    {
        return res.send(founddrugs);
    }
    else if (founddrugs.length === 0)
    {
        return res.sendStatus(204);
    }
  });
  connection.end();
  });

  // search medicine info
  app.post('/search_medicine_info', function(req, res) {
    var connection = mysql.createConnection(dbconfig.connection);
    connection.query('USE ' + dbconfig.database);
    connection.query('SELECT * FROM `medicines_t` WHERE medicines_t.m_name="'+req.body.searchText+'";', function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      if(results !== undefined)
      {
          return res.send(results);
      }
      else if (results === undefined)
      {
          return res.sendStatus(204);
      }
    });
    connection.end();
    });

  // search medicine by ID
  app.post('/search_medicine_by_id', function(req, res) {
    var connection = mysql.createConnection(dbconfig.connection);
    connection.query('USE ' + dbconfig.database);
    connection.query('SELECT * FROM `medicines_t`', function (error, results, fields) {
      if (error) throw error;
      var drug = results.find(function(element){
          console.log(req.body.searchId);
          return (element.m_id === req.body.searchId)
      });

      console.log(drug);

      if(drug !== undefined)
      {
          return res.send(drug);
      }
      else
      {
          return res.sendStatus(204);
      }
    });
    connection.end();
    });

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
