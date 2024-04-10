//generates jsonwebtokns here

import jwt from "jsonwebtoken";

const  generateTokenAndSetCookie =( userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

    res.cookie("jwt",token,{
        maxAge: 35*24*60*60*100, // in miliseconds
        httpOnly:true, // prevents xxs attacks
         sameSite :"strict",
         secure:process.env.NODE_ENV !== "development"   
    })
}
export default generateTokenAndSetCookie;