import express from "express";
import {
    getMovies,
    getMovieById,
    readMovie,
    deleteMoviebyId,
    updateMoviebyId
} from "../service/movies.service.js";
export const router = express.Router();
import bcrypt from 'bcrypt';


router.get("/", async function (request, response) {
    //db.movies.find({})
    const movies = await getMovies(); //cursor(pagination) to array

    console.log(movies);
    response.send(movies);
});
router.get("/:id", async function (request, response) {
    // console.log(request.params)
    const { id } = request.params;
    // const movie=movies.find(mv=> mv.id == id);
    //db.movies.findOne({id:100})
    const movie = await getMovieById(id);

    console.log(movie);

    movie ? response.send(movie) :
        response.status(404).send({ message: 'Movie not Found' });
});
router.post("/", async function (request, response) {

    const data = request.body;
    console.log(data);

    //db.movies.insertMany(data)
    const result = await readMovie(data);

    response.send(result);
});
//deleting
router.delete("/:id", async function (request, response) {

    const { id } = request.params;
    console.log(id);
    // const movie=movies.find(mv=> mv.id == id);
    //db.movies.findOne({id:100})
    const result = await deleteMoviebyId(id);

    console.log(result);

    result.deletedCount >= 1
        ? response.send({ message: 'Movie Deleted Successfully' }) :
        response.status(404).send({ message: 'Movie not Found' });
});
//updating
router.put("/:id", async function (request, response) {

    const { id } = request.params;
    console.log(id);
    //taking from body
    const data = request.body;
    console.log(data);

    const result = await updateMoviebyId(id, data);

    response.send(result);

});


export default router;


