// COntrolls authentication process while signing up logging in and Logout proceses

import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const Signup = async (req, res) => {
  try {
    const { fullname, username, password, confirm_password, gender } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords Donot match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username Already in use" });
    }

    // hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //https://avatar-placeholder.iran.liara.run
    const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyPic : girlPic,
    });

    if (newUser) {
      // generate jwt here
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(500).json({ Error: "Invalid user credentials" });
    }
  } catch (err) {
    console.log("Error While sign up", err.message);
    res.status(500).json({ error: "erroe in signup" });
  }
};

export const Login = async (req, res) => {
  try { 
    const { username, password } = req.body;
    
    const  userExists = await User.findOne({ username});
    const pwMatch = await  bcrypt.compareSync(password, userExists?.password || "");
    
    if(!username || !pwMatch) {
      return res.status(500).json({ error:"Invalid username or password."})
    }
    
    if(userExists && pwMatch){
      generateTokenAndSetCookie(userExists._id,res);
      

      res.status(200).json({
        _id:userExists._id,
        fullname:userExists.fullname,
        username:userExists.username,
        profilePic:userExists.profilePic
      })
     }

  } catch (err) {
    console.log("Error While Logging in", err.message);
    res.status(500).json({ error: "error in Login" });
  }
};

export const Logout = (req, res) => {
 try{
   res.cookie("jwt","",{maxAge:0});
   res.status(200).json({Message:"Logged Out Successfully"});
 }
 catch (err) {
  console.log("Error While Logging out", err.message);
  res.status(500).json({ error: "error in Logout" });
}
};
