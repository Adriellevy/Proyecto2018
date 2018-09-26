/*
var http = require('http');
var express = require('express');
var port = 8080;
var app = express();
var server = http.createServer(app);

app.set('port', port);
app.use(express.static(__dirname + '/public'));
server.listen(port);
console.log('Server on port '+port+'...');

app.get('/login', function (req, res) {
	res.sendFile(__dirname + '/views/inicioSesion.html');
});
*/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
console.log(process.env.PORT);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public'));
// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../static')))



app.get('/mysql', function (req, res) {
  var sql = 'SELECT * FROM `users`'

  if (req.query.id) {
    sql = sql + ` WHERE \`id\`= ${req.query.id} LIMIT 1`
  }

  connection.query(sql, function (error, results, fields) {
    if (!error) {
      res.send(results)
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  })
})

app.post('/mysql', function (req, res) {
  if (req.body.name && req.body.age) {
    connection.query(`INSERT INTO \`users\` (\`name\`, \`age\`) VALUES ('${req.body.name}', '${req.body.age}')`, function (error, results, fields) {
      if (!error) {
        res.status(201).send(results)
      } else {
        console.error(error)
        res.status(500).send(error)
      }
    })
  } else {
    res.status(403).send({error: 'You must specify the name and age values.'})
  }
})

app.put('/mysql/:id', function (req, res) {
  if (req.body.name || req.body.age) {
    var sql = 'UPDATE `users` SET'
    if (req.body.name) {
      sql = sql + ` \`name\`="${req.body.name}"`
      if (req.body.age) {
        sql = sql + ','
      }
    }
    if (req.body.age) {
      sql = sql + ` \`age\`=${req.body.age}`
    }
    sql = sql + ` WHERE \`id\`=${req.params.id}`

    connection.query(sql, function (error, results, fields) {
      if (!error) {
        res.status(200).send(results)
      } else {
        console.error(error)
        res.status(500).send(error)
      }
    })
  } else {
    res.status(403).send({error: 'You must specify the name or age values.'})
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app; 
