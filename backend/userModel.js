const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    userAge:{
        type:Number,
    },
    userNumber:{
        type:Number
    },
    userBloodGroup:{
        type:String,
    }
})

const UserModel=mongoose.model("UserModel",UserSchema);

module.exports=UserModel;