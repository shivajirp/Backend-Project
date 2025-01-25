import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
});

// dotenv.config();

connectDB();


/*
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