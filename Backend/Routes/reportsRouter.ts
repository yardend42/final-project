//getting the methods we will use
import express, { NextFunction, Request, Response } from "express";
//import vehicles=> my logic for vehicles

import { checkJWT } from "../utils/jwt";
import dal_mysql from "../DAL/dal_mysql";
import { getFollowersReport } from "../logic/reportsLogic";

const reportsRouter = express.Router();
//admin=> all,edit vecation,add,remove

reportsRouter.get(
  "/followersReport",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await getFollowersReport();
      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

//exporting
export default reportsRouter;
