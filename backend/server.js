import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./config/dbConnect.config.js";

dotenv.config();

const port = process.env.PORT || 5500;

// dbConnect().then(() => {
// });

app.listen(port, () =>
    console.log(`Construction Agent Server running on port ${port}.`),
);

// const bufferFromString = Buffer.from('Hello, world!', 'utf8');
// console.log(bufferFromString, "buffer ye raha");

// const bufferFromArray = Buffer.from([72, 101, 108, 108, 111]);
// console.log(bufferFromArray, "array ye raha");
