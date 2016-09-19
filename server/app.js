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

//Set public as static
app.use(express.static('server/public'));
