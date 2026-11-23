import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';

export const addsongs = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60).toString().padStart(2, '0')}`;
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    const song = new songModel(songData);
    await song.save();
    res.json({ success: true, message: "Song Added" });
    console.log({ name, desc, album, audioUpload, imageUpload });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

export const listSong = async (req, res) => {
  try {
    const allSong = await songModel.find({});
    res.json({ success: true, songs: allSong });
  } catch (error) {
    res.json({ success: false });
  }
};

export const removeSong = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedSong = await songModel.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.json({ success: false, message: "Song not found" });
    }

    res.json({ success: true, message: "Song Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};