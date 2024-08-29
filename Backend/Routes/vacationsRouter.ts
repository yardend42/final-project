import express, { NextFunction, Request, Response } from "express";
import {
  addVacation,
  deleteVacation,
  editVacation,
  getFollowersCount,
  getUserLikedVacations,
  getVacationsByPage,
  toggleFavorite,
} from "../logic/vacationsLogic";
import { Vacation } from "../models/vacations";
import { UploadedFile } from "express-fileupload";

const VacationsRouter = express.Router();

//USER=> all,follow,count
VacationsRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const page = parseInt(request.query.page as string) || 1;
      const limit = parseInt(request.query.limit as string) || 50;
      const vacations = await getVacationsByPage(page, limit);
      response.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

VacationsRouter.post(
  "/toggleFavorite",
  async (request: Request, response: Response, next: NextFunction) => {
    const { user_id, vacation_id } = request.body;
    try {
      const result = await toggleFavorite(user_id, vacation_id);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

VacationsRouter.get(
  "/followersCount",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await getFollowersCount();
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

VacationsRouter.get(
  "/liked/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const likedVacations = await getUserLikedVacations(userId);
      response.status(200).json(likedVacations);
    } catch (err) {
      next(err);
    }
  }
);

//ADMIN => add,edit,delete
VacationsRouter.post(
  "/add",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      //check if file
      const file = request.files?.image as UploadedFile;

      if (!file) {
        return response.status(400).send("No file uploaded.");
      }

      const addedVacation = await addVacation(request.body, file);

      response.status(201).json({
        msg: "Vacation added successfully",
        vacation: addedVacation,
      });
    } catch (err) {
      next(err);
    }
  }
);

VacationsRouter.put(
  "/edit/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = parseInt(request.params.id, 10);

      // Extract the file if it's included in the request
      const file = request.files?.image as UploadedFile;

      // Create the updated Vacation object
      const updatedVacation = new Vacation(
        request.body.destination,
        request.body.description,
        new Date(request.body.start_date),
        new Date(request.body.end_date),
        parseFloat(request.body.price),
        // existing image filename from bd or new filename if the image is updated
        request.body.image_filename
      );

      // Call the editVacation function
      const result = await editVacation(vacationId, updatedVacation, file);

      // Send the response back to the client
      response.status(200).json({
        msg: "Vacation edited successfully",
        vacation: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

VacationsRouter.delete(
  "/delete/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      const deletedVacation = await deleteVacation(vacationId);
      response.status(200).json(deletedVacation);
    } catch (err) {
      next(err);
    }
  }
);

//exporting
export default VacationsRouter;
