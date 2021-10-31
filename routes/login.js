import express, { response } from "express"
import { searchbyuser } from "../helper.js";
import { getallusers } from "../helper.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const router=express.Router();

const SECRET_KEY=process.env.SECRET_KEY


router.get("/" ,async (request, response) => {
    const result = await getallusers();
    response.send(result)
})

router.post("/", async (request, response) => {
    const { EmailId, Password } = request.body;
    const user = await searchbyuser(EmailId)
    
    if (user) {
        console.log(user)
        const dbPassword = user.Password;
        const loginPassword = Password;
        const isPassMatched = await bcrypt.compare(loginPassword, dbPassword);
        if(isPassMatched){
            const jtoken=jwt.sign({id:user._id},SECRET_KEY)
            
            response.send({message: "Successfull Login",token:jtoken,current_user:user,loggedin:true})
        }
        else
            response.send({message: "Invalid Credentials",loggedin:false})
    }
    else    
        response.send({message: "Invalid Credentials",loggedin:false})
})

export{router}