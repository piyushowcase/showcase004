import express from 'express';
import { addsongs, listSong, removeSong } from '../controller/songsController.js';
import upload from '../middlewares/multer.js';
import { isAuth,isAdmin } from '../middlewares/isAuth.js';

const songRouter = express.Router();

songRouter.post(
  '/add',
  isAuth,
  isAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  addsongs
);

songRouter.get('/list', listSong);
songRouter.post('/remove', isAuth, isAdmin, removeSong);

export default songRouter;