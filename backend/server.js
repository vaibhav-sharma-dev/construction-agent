import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./config/dbConnect.config.js";
import { createClient } from 'redis';

dotenv.config();

const port = process.env.PORT || 5500;

// dbConnect().then(() => {
// });


// const client = createClient({
//   url: "redis-12674.crce206.ap-south-1-1.ec2.redns.redis-cloud.com:12674"
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('test', 'tadaaa');
// const value = await client.get('key');
// console.log(value); // >>> value

app.listen(port, () =>
    console.log(`Construction Agent Server running on port ${port}.`),
);

// const bufferFromString = Buffer.from('Hello, world!', 'utf8');
// console.log(bufferFromString, "buffer ye raha");

// const bufferFromArray = Buffer.from([72, 101, 108, 108, 111]);
// console.log(bufferFromArray, "array ye raha");
