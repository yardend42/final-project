//install jwt token handler

import { UserCred } from "../models/UserCred";

//npm install jsonwebtoken
const jwt = require('jsonwebtoken');

//what is my secret key, i will not share it with any program
const secretKey = "the-secret-key-need-to-be-at-least-256-bytes";

//jwt => header,body,signature (secret key)
const createJWT = (user:UserCred)=>{
    const payload = {
        email:user.email,
        name: user.full_name,
        role: user.role,
        user_id: user.user_id
    }

    
    //for how long the token will be alive
    const options = {expiresIn: '1h'};

    const myJWT = jwt.sign(payload,secretKey,options);
    return "Bearer "+myJWT;
}

const checkJWT = (token:string)=>{
    try{
        const checkToken=token.split(' ')[1];
        const decoded = jwt.verify(checkToken,secretKey);
        return createJWT(new UserCred(0, decoded.name.split(' ')[0], decoded.name.split(' ')[1], decoded.id, '',decoded.password, decoded.role));
    } catch (err:any) {
        console.log("error: ",err.name);
        return "";
    }
}

export {
    createJWT,
    checkJWT,

}