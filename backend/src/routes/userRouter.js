 import express from 'express'
import { loginUser, logoutUser, myProfile, registerUser,saveToPlaylist } from '../controller/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
const userRouter=express.Router();
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/me",isAuth,myProfile)

userRouter.get("/logout",logoutUser)
userRouter.post("/song/:id", isAuth, saveToPlaylist);
export default userRouter