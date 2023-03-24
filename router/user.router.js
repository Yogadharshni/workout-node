import express from "express";
import { getUserByName, createUser, loginUser } from "../service/user.service.js";
const router = express.Router();
import bcrypt from 'bcrypt';


//to get hash password(also install npm i bcrypt and import)
async function generateHashedPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(salt)
    console.log(hashedPassword)
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
        response.status(400).send({ message: 'Password must be atleast 8 characters' });
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
    const userFormDB = await loginUser(username)
    console.log(userFormDB);

    if (!userFormDB) {
        response.status(400).send({ message: 'Invalid credentials' });
    } else {
        const storedDBPassword = userFormDB.password
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword)
        console.log(isPasswordCheck)
        if (isPasswordCheck) {
            response.send({ message: 'Successful Login' });
        } else {
            response.status(400).send({ message: 'Invalid credentials' });
        }
    }
});


export default router;


