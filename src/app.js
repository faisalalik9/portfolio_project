const express = require('express');
const path = require('path');
const http = require('http');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('./db.js').mongoose;
var bodyParser = require('body-parser');
const keys = require('./keys');
const moment = require('moment');
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

      getUsers();

      res.render('private',{clients:clients, size:size});
    }
    else{
      var value = false;
      res.render("auth",{value:value});
    }
 });



const Client = mongoose.model('users');
let clients;
let size;
 async function getUsers(){

   clients = await Client.find();
   size = clients.length;
   console.log("client: ",clients);
   console.log(clients.length);
 }

let userUser;
app.get('/chat',(req,res)=>{
  userUser = req.user;
  console.log(userUser);
  res.render('chatapp');
});

const roomName = "Faisal 5128";

async function addMessage(msg,time,user){
  currentUser = await Client.updateOne({googleId:userUser.googleId},{
    $addToSet:{
      messages:{message:msg,time:time,user:user}
    }
  });

  console.log(currentUser);
  console.log("Done");
}


io.on('connection', (socket)=>{

if(userUser){
  socket.on('joinRoom',({user})=>{

  socket.join(userUser.name);

  socket.emit('message', formatMessage('Nova','https://avatars.githubusercontent.com/u/66014401?s=400&u=c77226d568829aeb2b96c3078fe5d52b9c78a3e4&v=4', "Welcome User, I am Nova's Assistant !"));

  socket.broadcast.to(userUser.name).emit('message',formatMessage('Nova','https://avatars.githubusercontent.com/u/66014401?s=400&u=c77226d568829aeb2b96c3078fe5d52b9c78a3e4&v=4',`${userUser.name} has joined`));


  });




  socket.on('chatMessage',(msg)=>{
    addMessage(msg, moment().format('h:mm a'),"user");
    io.to(userUser.name).emit('message',formatMessage(userUser.name,userUser.image,msg));


    socket.on('disconnect', ()=>{
      io.emit('message','User has left');
    });

  });

}
else{
  socket.on('chatMessage',(msg)=>{
    addMessage(msg, moment().format('h:mm a'),"nova");
    io.to(roomName).emit('message',formatMessage(roomName,'https://avatars.githubusercontent.com/u/66014401?s=400&u=c77226d568829aeb2b96c3078fe5d52b9c78a3e4&v=4',msg));
});

}









});





module.exports=server;
