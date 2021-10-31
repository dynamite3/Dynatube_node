
import express, { response } from "express"
import { searchbyuserInReset } from "../helper.js";

const router=express.Router();



router.post("/", async (request, response) => {
    const { EmailId} = request.body;
    console.log(EmailId)

    const user = await searchbyuserInReset(EmailId)
    if (user){
        response.send(user)
    }
    else    
        response.send({message: "User does not exist",flag:false})
})


export{router}