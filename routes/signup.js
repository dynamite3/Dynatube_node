import express, { response } from "express"
import { addusers } from "../helper.js";
import bcrypt from "bcrypt"

const router=express.Router();



export default async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    return (hashedPassword)
}

router.post("/", async (request, response) => {
    const { FirstName, LastName, EmailId, Password} = request.body;
    const hashedPassword = await generatePassword(Password)
    const result = await addusers(FirstName, LastName, EmailId, hashedPassword);
    response.send(result)
})

export{router}