
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from './config/passport.js';
import cookieSession from 'cookie-session';
import foodRoutes from './routes/foodRoutes.js';
import restauProductRoutes from './routes/restauProductRoutes.js';
import productPercentageRoutes from './routes/productPercentageRoutes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5100;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cookieSession({
    name: "session",
    keys: [passport.session.cookieKey],
  })
);

// Middleware
app.use(express.json());
app.use(cors());
app.get("/", (_req, res) => res.send("hello wico back?"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/public/images", express.static("public/images"));

// Routes

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', clientRoutes);
app.use('/api/foods', foodRoutes); 
app.use('/api/productPercentages', productPercentageRoutes);
app.use('/api/restauProducts', restauProductRoutes);



// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
