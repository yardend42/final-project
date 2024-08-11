import express, { NextFunction, Request, Response } from "express";

import {
  addVacation,
  deleteVacation,
  editVacation,
  getAllVacations,
  getFollowersCount,
  getUserLikedVacations,
  toggleFavorite,
} from "../logic/vacationsLogic";
import { Vacation } from "../Models/vacations";
import { v4 as uuidv4 } from "uuid";
import fileUpload from "express-fileupload";
import path from "path";
import { error } from "console";

const VacationsRouter = express.Router();

//USER=> all,follow,count
VacationsRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await getAllVacations();
      console.log("Returning vacations: ", vacations);
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
      // Access the uploaded file
      const file = request.files?.image as fileUpload.UploadedFile;
      //?
      if (!file) {
        return response.status(400).send("No file uploaded.");
      }

      // Generate a unique filename
      const uniqueFileName = `${uuidv4()}${path.extname(file.name)}`;

      
      // Set the upload path to 'frontend/public/vacationImg'
      const uploadPath = path.join(__dirname, '../../frontend/public/vacationImg', uniqueFileName);

      // Move the file to the desired directory
      file.mv(uploadPath, async (error) => {
        if (error) {
          return response.status(500).send(error);
        }

        //creat new vacation object
        const newVacation = new Vacation(
          request.body.destination,
          request.body.description,
          request.body.start_date,
          request.body.end_date,
          request.body.price,
          uniqueFileName  // Save the unique file name to the database
        );
        // Save the vacation to the database
        const addedVacation = await addVacation(newVacation);
        const addedVacationID = addedVacation.insertId;

        response.status(201).json({
          msg: "added seccesfully",
          vacation: newVacation,
          VacationId: addedVacationID,
        });
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
      const updatedVacation = new Vacation(
        request.body.destination,
        request.body.description,
        request.body.start_date,
        request.body.end_date,
        request.body.price,
        request.body.image_filename
      );

      const result = await editVacation(vacationId, updatedVacation);
      response.status(200).json({
        msg: "edited successfully",
        vacation: updatedVacation,
        result,
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
