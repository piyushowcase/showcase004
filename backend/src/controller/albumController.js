import {v2 as cloudinary} from "cloudinary"
import albumModel from "../models/albumModel.js"
const addAlbum=async(req,res)=>{
try {
    const{name,desc,bgColor}=req.body
    const imageFile=req.file;
    const imageUploads=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image",
     
    })
            // const imageUploads = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

    const albumData={
        name,
        desc,
        bgColor,
        image: imageUploads.secure_url
    }
    const album= new albumModel(albumData)
    await album.save();
    res.json({success:true,message:"Album Added"})
} catch (error) {
    res.json({success:false,message:error.message})
}
}
const listAlbum=async(req,res)=>{
    try {
        const allAlbum=await albumModel.find({})
res.json({success:true,message:allAlbum})
    } catch (error) {
            res.json({success:false,message:error.message})

    }
}
const removeAlbum = async (req, res) => {
  try {
    const { id } = req.body;
    await albumModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Album Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export {addAlbum,listAlbum,removeAlbum}