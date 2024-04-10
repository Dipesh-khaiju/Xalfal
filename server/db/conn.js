import mongoose, { mongo } from "mongoose";

const mongoConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To MOngoDb server.")
    }
    catch(error){
        console.log("Error while connecting to MongoDb",error.message)
    }
}

export default mongoConnect;