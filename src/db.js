const mongoose = require('mongoose');
const url = "mongodb+srv://faisal123:faisal123@cluster0.8yumn.mongodb.net/User-data?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true,
 useUnifiedTopology: true });

module.exports={
  mongoose
}
