import generateToken from "../../utilities/generateToken.js";
import TryCatch from "../../utilities/TryCatch.js";
import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
export const registerUser=TryCatch(async(req,res)=>{
    const{name,email,password}=req.body
    if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required",
    });
  }
    let user =await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:"ser already exists",
        })
    }
    const hashPassword =await bcrypt.hash(password,10) 

user= await User.create({
name,
email,
password:hashPassword,
})
generateToken(user._id,res)
res.status(201).json({
    user,
    message:"User Registered",
})
})
export const loginUser=TryCatch(async(req,res)=>{
        const{email,password}=req.body
    if (!email || !password) {
    return res.status(400).json({
      message: " email, and password are required",
    });
  }
    const user =await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"invalid credentials",
        })
    }
    const comparedPassword=await bcrypt.compare(password,user.password)
if(!comparedPassword){
    return res.status(400).json({message:"invalid credentials"})
}
generateToken(user._id,res);
res.status(200).json({user,message:"user loggedIn"})

})
export const myProfile=TryCatch(async(req,res)=>{
const user=await User.findById(req.user._id);
res.json(user);
})
export const logoutUser = TryCatch(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "logout successfully" });
});
export const saveToPlaylist = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.playlist.includes(req.params.id)) {
    const index = user.playlist.indexOf(req.params.id);

    user.playlist.splice(index, 1);

    await user.save();

    return res.json({
      message: "Removed from playlist",
    });
  }

  user.playlist.push(req.params.id);

  await user.save();

  return res.json({
    message: "added to playlist",
  });
});