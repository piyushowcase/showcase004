import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import SongRouter from './src/routes/songRouter.js';
import { connectDb } from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoutes.js';
import userRouter from './src/routes/userRouter.js';
// app config
const app = express()
// http://localhost:5174/add-song
// Set up CORS properly once before routes
const allowedOrigins = ['https://showcase004-3.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const port = process.env.PORT || 5000; // Updated default port to 5000 to match your frontend API URL

connectCloudinary();

// middleware

app.use(express.json());
app.use(cookieParser())
// REMOVED redundant app.use(cors()) here!

// initializing routes
app.use("/api/user", userRouter)
app.use("/api/song", SongRouter)
app.use("/api/album", albumRouter)

app.get('/', (req, res) => res.send('Hello World!'))

try {
  await connectDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
 
} catch (error) {
  console.log(error);
}
