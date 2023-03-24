import { client } from '../index.js';


export async function getUserByName(username) {
    return await client
        .db('b42wd2')
        .collection('user')
        .findOne({ username: username });
}

export function createUser(data) {
    console.log(data)
    return client.db("b42wd2").collection("user").insertOne(data);

}

export async function loginUser(username) {
    return await client
        .db('b42wd2')
        .collection('user')
        .findOne({ username: username });
}