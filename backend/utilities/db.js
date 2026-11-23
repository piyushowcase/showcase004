import mongoose from "mongoose"
export const connectDb=async()=>{
   try {
     await mongoose.connect(process.env.MONGODBURI,{
        dbName:"SpotifyClone",
     })
     console.log("monogoDb connect succesfully")
}


   catch (error) {
    console.log(error)
   }}