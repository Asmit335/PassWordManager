import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import UserModel1 from './models/user.js'

const app = express();
const port = process.env.PORT || 4000



app.get('/', (req, res) => {
    res.send(`express is running in the port ${port}`);
})


app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MONGODB");
    })
    .catch(e => {
        console.log("Error Connecting.", e);
    })