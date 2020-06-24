const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/index", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/index", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var urlstatement = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var requestStatement =urlstatement + crypto + fiat ;
  request(requestStatement, function(error, response, body){
  console.log(response.statusCode);
  var data = JSON.parse(body);
  var result = data.last;

  res.write("<p> "+"THis is a paragraph"+"</p>");
  res.write("<h1> the price of "+crypto+"is :"+result+fiat+"</h1>");
  res.send();
  });
});

app.listen(4000,function(){
  console.log("The server is listing at port number 4000");
});
