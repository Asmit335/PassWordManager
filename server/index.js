import express from 'express';
import dotenv from 'dotenv';
import { UserRouter } from './routes/user.js';
import mongoose from 'mongoose'; // Import mongoose
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    // origin: ["http://localhost:5173"],
    // credentials: true
}));
app.use(cookieParser())
app.use(cors())
app.use(UserRouter);





// API creation

app.get("/", (req, res) => {
    res.send("Express App is running.")
})



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT NUMBER ${process.env.PORT}`);
});