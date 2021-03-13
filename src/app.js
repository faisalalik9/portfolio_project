const express = require('express');
const path = require('path');
const http = require('http');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('./db.js').mongoose;
var bodyParser = require('body-parser');
const keys = require('./keys');
require('./models/user');
require('./services/passport');

const socketio = require('socket.io');
const formatMessage = require('./messages');
const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(cookieSession({
  maxAge: 30*24*60*60*1000,
  keys: [keys.cookieKey]
})
);

app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes')(app);



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


  app.get("/auth",function(req,res){
    res.render("auth",{value:true});
  });

  app.post("/private",function(req,res){
   console.log(req.body);
  var name = req.body.name;
  var password = req.body.password;

    console.log(name);
    console.log(password);

    if(name === "Nova" && password === "Rdsharma12$"){
      res.send("Nova detected");
    }
    else{
      var value = false;
      res.render("auth",{value:value});
    }
 });


// app.get("/chat",function(req,res){
//   res.render("chatapp");
// });
var userUser;
app.get('/chat',(req,res)=>{
  userUser = req.user;
  console.log(userUser);
  res.render('chatapp',{user:userUser});
});


io.on('connection', (socket)=>{

  socket.emit('message', formatMessage('Nova','null', "Welcome User, I am Nova's Assistant !"));

  socket.broadcast.emit('message',formatMessage('Nova','null','New user has joined'));


  socket.on('disconnect', ()=>{
    io.emit('message','User has left');
  });


  socket.on('chatMessage',(msg)=>{
    io.emit('message',formatMessage(userUser.name,userUser.image,msg));
  });


});





module.exports=server;
