import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
var port = process.env.PORT;

dotenv.config({
    path: './.env'
});


connectDB()
.then( () => {
    app.on("error", () => {
        console.log("Error", error);
    })
    
    app.listen( port || 8000, () => {
        console.log(`App is running on port: ${port}`);
    })
})
.catch( (err) => {
    console.log("MongoDB connection error", err);
})









/*
import express from "express"

const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on( "errror", (error) => {
            console.log(error);
            throw err
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is running on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.log("Error", error);
        throw err
    }
})()
*/