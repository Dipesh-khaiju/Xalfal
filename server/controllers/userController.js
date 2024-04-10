import User from "../models/userModels.js";

export const getUsersForSidebar = async(req,res)=>{
    try{
            const LoggedInUserId = req.user._id;

            const filteredUsers = await User.find({_id:{$ne: LoggedInUserId}}).select("-password") //get everyone except us

             return res.status(200).json(filteredUsers)
    }
    catch (err) {
        console.log("Error in user controller", err.message);
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
}