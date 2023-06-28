const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        
    },
    lastname:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    cart:{
        type:Array,
        default:[],
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    address: [{type:mongoose.Schema.Types.ObjectId,ref:"Address"}],          
    wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
    refreshToken:{
        type:String,
    },
    passwoedChangedAt:{
        type:Date,
    },
    passwordResetToken:{
        type:String,
    },
    passwordResetExpires:{
        type:Date,
    }
},{
    timestamps:true,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt =await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hashSync(this.password,salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createPasswordResetToken= async function (){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.passwordResetToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires=Date.now()+30*60*1000;//10 min
    return resetToken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);