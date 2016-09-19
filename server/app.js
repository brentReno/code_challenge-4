var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');
var pg = require('pg');
var connectionString = "postgres://localhost:5432/treats";
var port = process.env.PORT || 3030;

//Spin up server
app.listen( port, function(){
  console.log(" The server is listening on:", port);
});// end spin up

//base url
app.get('/', function(req, res){
  console.log("Base url hit");
  res.sendFile(path.resolve("server/public/views/index.html"));
});// end base hit

//treats get route
app.get("/treats", urlEncodedParser, function(req, res){
  console.log("in GET treats");
  //connect to db
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end if
    else{
      console.log("Connected to the DB");
      //array to hold treats
      var treatsArray =[];
      //make wuery var
      var  queryResults = client.query('SELECT * FROM treat');
      queryResults.on('row', function (row){
        treatsArray.push(row);
      });// end on row
      queryResults.on('end', function(){
        done();
        res.send(treatsArray);
      }); // end of on end
    }//end else
  });// end pg connect
}); // end get treats

// add new treats POST
app.post('/treats', urlEncodedParser, function(req, res){
  //create vars from req.body
  var name= req.body.name;
  var description = req.body.description;
  var pic = req.body.url;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end if
    else{
      console.log("Connected to the DB");
      client.query('INSERT INTO treat(name, description, pic) VALUES($1,$2,$3);',[name, description, pic]);
      var queryResult = client.query('SELECT * FROM treat WHERE name= $1;', [name]);
      done();
      res.send(queryResult);
    }//end else
  });//end PG connect
}); //end treats post

//Set public as static
app.use(express.static('server/public'));
