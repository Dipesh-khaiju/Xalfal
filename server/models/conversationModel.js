import mongoose  from "mongoose";
 
const ConvoSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",   // The id is gonna be from User collection
    
    }],

    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        default:[],
    }]
},{timestamps:true}); // timestamps fives created at and updated at

const Conversation = new mongoose.model("Conversation",ConvoSchema);

export default Conversation;