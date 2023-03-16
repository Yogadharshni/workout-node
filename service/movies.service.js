import { client } from '../index.js';


export async function updateMoviebyId(id, data) {
    return await client
        .db('b42wd2')
        .collection('movies')
        .updateOne({ id: id }, { $set: data });
}

export async function deleteMoviebyId(id) {
    return await client
        .db('b42wd2')
        .collection('movies')
        .deleteOne({ id: id });
}

export async function readMovie(data) {
    return await client
        .db('b42wd2')
        .collection('movies')
        .insertMany(data);
}

export async function getMovieById(id) {
    return await client
        .db('b42wd2')
        .collection('movies')
        .findOne({ id: id });
}

export async function getMovies() {
    return await client
        .db('b42wd2')
        .collection('movies')
        .find({}).toArray();
}
