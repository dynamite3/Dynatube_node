import express, { response } from "express"
import { addRandomNumber } from "../helper.js";
import { searchbyuser } from "../helper.js";

const router=express.Router();

router.post("/", async (request, response) => {
    const { EmailId} = request.body;
    // console.log(EmailId)

    const user = await searchbyuser(EmailId)

    if (user){
        const randomNum=Math.floor(100000 + Math.random() * 900000)
        // console.log(randomNum)
        addRandomNumber(EmailId,randomNum)
        
    }
    if (user) {
            response.send({message: "User Exist",EmailId,flag:true})
    }
    else    
        response.send({message: "User Does not exist",flag:false})
})

export{router}