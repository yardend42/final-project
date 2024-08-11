import express, { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../logic/loginLogic";
import { checkJWT, createJWT } from "../Utils/jwt";

const loginRouter = express.Router();

//login methods: loginUser, registerUser
export type userCred = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  jwt: string;
};
//loginUser
loginRouter.post(
  "/loginUser",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userCred = request.body;
    const userData = await loginUser(userCred);
    console.log("userData", userData);

    //need to expose headers
    try {
      if (userData !== undefined && userData["jwt"].length > 10) {
        console.log(userData);
        response
          .status(200)
          .header("Authorization", userData["jwt"])
          .json(userData);
      }
    } catch {
      response.status(401).json({ msg: userData.msg });
    }
  }
);

loginRouter.post(
  "/registerUser",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let result = await registerUser(request.body);
    console.log(result);
    response.status(200).json({ msg: result });
  }
);

//jwt
loginRouter.post(
  "/getJWT",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userData = request.body;
    response.status(200).json({ jwt: createJWT(userData) });
  }
);

loginRouter.get(
  "/checkJWT/:token",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log("token: ", request.params.token);
    if (checkJWT(request.params.token)) {
      response.status(200).json({ msg: "all ok" });
    } else {
      response.status(401).json({ msg: "token is invalid" });
    }
  }
);
export default loginRouter;
