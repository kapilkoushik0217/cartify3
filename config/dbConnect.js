const {default: mongoose} = require('mongoose');
const dbConnect = () => {
   try{
    const conn= mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
   }
   catch(err){
    console.log(err);
   }
}

module.exports = dbConnect;