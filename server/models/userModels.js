 // Schema and model for the signUP database  is defined in this file 
import mongoose  from "mongoose";
  

const userSchema = new mongoose.Schema({
    fullname:{
        type: 'string',
        required: true
    },
    username:{
        type: 'string',
        required: true,
        unique:true
    },
    password:{
        type: 'string',
        required: true,
        minlength:8
    },
    gender:{
        type: 'string',
        required: true,
        enum:["male", "female"],
    },
    profilePic:{
        type: 'string',
        default:""
    }
}); 

const User = mongoose.model("User",userSchema);

export default User;