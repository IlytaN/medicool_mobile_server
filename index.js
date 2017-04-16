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

// search medicine (no query yet)
app.post('/search_medicine', function(req, res) {
  var drug = medicines_t.find(function(element){
      return element.m_generic_name === req.body.searchText
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
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// dummy data to test
var medicines_t = [{
    m_id: 0,
    m_general_desc: "for headache",
    m_generic_name: "panadol",
    m_photo: "img/panadol.jpg",
    m_imprint: "ajbkbsdfj",
    m_strength: 3,
    m_color: "white",
    m_shape: "round",
    m_availablity: "everywhere",
    m_drug_class: "fancy",
    m_pregnancy_cat: "avoid",
    m_csa_schedule: "2 times a day",
    m_manufactures: "USmedicine",
    m_description: "blablabla blablabla blablabla blablabla",
    m_rating: 8,
    m_comments_count: 23
  },
  {
    m_id: 1,
    m_general_desc: "for stomach",
    m_generic_name: "paracetamol",
    m_photo: "img/panadol.jpg",
    m_imprint: "ajbkbsdfj",
    m_strength: 5,
    m_color: "white",
    m_shape: "round",
    m_availablity: "everywhere",
    m_drug_class: "fancy",
    m_pregnancy_cat: "avoid",
    m_csa_schedule: "1 time a day",
    m_manufactures: "Finlandmedicine",
    m_description: "blablabla blablabla blablabla blablabla",
    m_rating: 9,
    m_comments_count: 10
  },
  {
    m_id: 2,
    m_general_desc: "for headache",
    m_generic_name: "vitamin D",
    m_photo: "img/ionic.png",
    m_imprint: "ajbkbsdfj",
    m_strength: 7,
    m_color: "white",
    m_shape: "round",
    m_availablity: "everywhere",
    m_drug_class: "fancy",
    m_pregnancy_cat: "avoid",
    m_csa_schedule: "3 times a day",
    m_manufactures: "UKmedicine",
    m_description: "blablabla blablabla blablabla blablabla",
    m_rating: 9,
    m_comments_count: 21
  }];
