const express = require('express');
const path = require('path');
const mongoose = require('./db.js').mongoose;
var bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");

const pathName=path.join(__dirname,'/public');

const viewsPath = path.join(__dirname, '/views')
app.set('views', viewsPath)

app.use(express.static(pathName));

app.use(bodyParser.urlencoded({ extended: false }))



const userSchema = new mongoose.Schema(
  {
    data:Object,
  },
  {
    collection: "Users"}
 );
 const User = mongoose.model("User",userSchema);
 const userData = (bodyData) => {
   User({data:bodyData}).save((err)=>{
     if(err){
       throw err;
     }
   })
 }


 const ratingSchema = new mongoose.Schema(
   {
     star:"string",
   },
   {
     collection: "rating"}
  );
  const Rating = mongoose.model("Rating",ratingSchema);
  const ratingData = (bodyData) => {
    Rating({star:bodyData}).save((err)=>{
      if(err){
        throw err;
      }
    })
  }




app.post("/",function(req,res){
  console.log(req.body);
  userData(req.body);
  res.redirect("/");
});

app.post("/rating",function(req,res){
  console.log(req.body.star);
  ratingData(req.body.star);
  res.redirect("/");
})



app.get("/",function(req,res){
  res.render("home");
});








module.exports=app;
