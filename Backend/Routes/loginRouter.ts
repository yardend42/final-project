import express, { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../logic/loginLogic";

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

    //need to expose headers
    try {
      if (userData !== undefined && userData["jwt"].length > 10) {
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
    response.status(200).json({ msg: result });
  }
);

export default loginRouter;
