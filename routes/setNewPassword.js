import express, { response } from "express"
import generatePassword from "./signup.js"
import { updatePassword } from "../helper.js";

const router=express.Router();






router.post("/", async (request, response)=>{
    const {EmailId,Password}=request.body;
    const hashedPassword = await generatePassword(Password)
    const k=await updatePassword(EmailId,hashedPassword)
    response.send(k)
})


export{router}