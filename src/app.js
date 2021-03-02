const express = require('express');
const path = require('path');

var bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");


const pathName=path.join(__dirname,'/public');


const viewsPath = path.join(__dirname, '/views')
app.set('views', viewsPath)

app.use(express.static(pathName));

app.use(bodyParser.urlencoded({ extended: false }))





app.get("/",function(req,res){
  res.render("home");
});








module.exports=app;
