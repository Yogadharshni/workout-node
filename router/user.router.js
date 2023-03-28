import express from "express";
import { getUserByName, createUser } from "../service/user.service.js";

import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';


const router = express.Router();
//to get hash password(also install npm i bcrypt and import)
async function generateHashedPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(salt)
    console.log(hashedPassword)
    return hashedPassword;
}
// generateHashedPassword('Yoga@123')

router.post("/signup", async function (request, response) {

    const { username, password } = request.body;
    const userFormDB = await getUserByName(username)
    console.log(userFormDB);

    if (userFormDB) {
        response.status(400).send({ message: 'Username already exists' });
    }
    else if (password.length < 8) {
        response
            .status(400)
            .send({ message: 'Password must be atleast 8 characters' });
    } else {
        const hashedPassword = await generateHashedPassword(password)
        const result = await createUser({
            username: username,
            password: hashedPassword,
        });
        response.send(result);
    }
});

//login - message - login successful/invalid credentials

router.post("/login", async function (request, response) {

    const { username, password } = request.body;
    const userFormDB = await getUserByName(username)
    console.log(userFormDB);

    if (!userFormDB) {
        response.status(400).send({ message: 'Invalid credentials' });
    }
    else {
        const storedDBPassword = userFormDB.password
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword)
        console.log(isPasswordCheck)
        if (isPasswordCheck) {
            const token = Jwt.sign({ id: userFormDB }, process.env.SECRET_KEY)
            response.send({ message: 'Successful Login', token: token });
        } else {
            response.status(400).send({ message: 'Invalid credentials' });
        }
    }
});


export default router;


