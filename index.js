import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
console.log(process.env.MONGO_URL)
// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from './router/movies.router.js'

//express.json()
//intercepts -> apply midleware -> converting body to json
const app = express();

// const PORT = 4000;
const PORT = process.env.PORT; //auto assignable

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;


export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
app.use(express.json())

app.get("/", function (request, response) {
  response.send('Welcome to my App');
});

app.use('./movies', moviesRouter)
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));