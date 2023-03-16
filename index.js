import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

console.log(process.env.MONGO_URL)

// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";

//express.json()
//intercepts -> apply midleware -> converting body to json
const app = express();

const PORT = 4000;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;


const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
app.use(express.json())

app.get("/", function (request, response) {
  response.send('Welcome to Express');
});



app.get("/movies", async function (request, response) {
  //db.movies.find({})
  const movies = await client
    .db('b42wd2')
    .collection('movies')
    .find({}).toArray(); //cursor(pagination) to array

  console.log(movies)
  response.send(movies);
});




app.get("/movies/:id", async function (request, response) {
  // console.log(request.params)
  const { id } = request.params
  // const movie=movies.find(mv=> mv.id == id);

  //db.movies.findOne({id:100})
  const movie = await client
    .db('b42wd2')
    .collection('movies')
    .findOne({ id: id })

  console.log(movie)

  movie ? response.send(movie) :
    response.status(404).send({ message: 'Movie not Found' });
});


app.post("/movies", async function (request, response) {

  const data = request.body
  console.log(data)

  //db.movies.insertMany(data)
  const result = await client
    .db('b42wd2')
    .collection('movies')
    .insertMany(data)

  response.send(result)
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


//deleting
app.delete("/movies/:id", async function (request, response) {

  const { id } = request.params
  console.log(id)
  // const movie=movies.find(mv=> mv.id == id);

  //db.movies.findOne({id:100})
  const result = await client
    .db('b42wd2')
    .collection('movies')
    .deleteOne({ id: id })

  console.log(result)

  result.deletedCount >= 1
    ? response.send({ message: 'Movie Deleted Successfully' }) :
    response.status(404).send({ message: 'Movie not Found' });
});

//updating
app.put("/movies/:id", async function (request, response) {

  const { id } = request.params
  console.log(id)
  //taking from body
  const data = request.body
  console.log(data)

  const result = await client
    .db('b42wd2')
    .collection('movies')
    .updateOne({ id: id }, { $set: data })

  response.send(result)

});