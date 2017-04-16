var express = require('express');
var app = express();
var mysql      = require('mysql');

app.get('/',function(req,res) {
  var connection = mysql.createConnection({
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11169445',
    password : 'cQg1JqpB8g'
  });
  connection.query('USE ' + 'sql11169445');
  connection.query('SELECT * FROM `medicines_t`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results);
  });
  connection.end();
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
