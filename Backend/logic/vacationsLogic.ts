import { Vacation } from "../models/vacations";
import dal_mysql from "../DAL/dal_mysql";
import { handleFileUpload } from "../utils/uuid";
import { UploadedFile } from "express-fileupload";

//all vacation
const getVacationsByPage = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const sql = `SELECT * FROM vacations LIMIT ${limit} OFFSET ${offset};`;
  const result = await dal_mysql.execute(sql);
  const vacations = (result as Vacation[]).map((row) => {
    return new Vacation(
      row.destination,
      row.description,
      new Date(row.start_date),
      new Date(row.end_date),
      row.price,
      row.image_filename,
      row.vacation_id
    );
  });
  return vacations;
};


//add vacation
const addVacation = async (vacationData: any, file: UploadedFile) => {
  // Handle file upload and get the unique filename
  const uniqueFileName = await handleFileUpload(file);

  // Create a new vacation object
  const newVacation = new Vacation(
    vacationData.destination,
    vacationData.description,
    vacationData.start_date,
    vacationData.end_date,
    vacationData.price,
    uniqueFileName // saving unique file name to database
  );

  // Format dates
  const formattedStartDate = newVacation.start_date.toString().slice(0, 10);
  const formattedEndDate = newVacation.end_date.toString().slice(0, 10);

  // Prepare SQL query
  const sql = `
    INSERT INTO vacations (destination, description, start_date, end_date, price, image_filename)
    VALUES ('${newVacation.destination}', '${newVacation.description}', '${formattedStartDate}', '${formattedEndDate}', ${newVacation.price}, '${newVacation.image_filename}')
  `;

  // Execute SQL query
  const result = await dal_mysql.execute(sql);
  return { ...newVacation, id: result.insertId };
};

const editVacation = async (
  vacationId: number,
  updatedVacation: Vacation,
  file?: UploadedFile
) => {
  let imageFilename = updatedVacation.image_filename;

  if (file) {
    // Handle file upload and get the unique filename
    imageFilename = await handleFileUpload(file);
  }

  4;
  // Format dates
  const formattedStartDate = updatedVacation.start_date
    .toISOString()
    .slice(0, 10);
  const formattedEndDate = updatedVacation.end_date.toISOString().slice(0, 10);

  const sql = `
    UPDATE vacations
    SET destination = '${updatedVacation.destination}', 
        description = '${updatedVacation.description}', 
        start_date = '${formattedStartDate}', 
        end_date = '${formattedEndDate}', 
        price = ${updatedVacation.price}, 
        image_filename = '${imageFilename}'
    WHERE vacation_id = ${vacationId}`;

  const result = await dal_mysql.execute(sql);
  return { ...updatedVacation, id: vacationId, image_filename: imageFilename };
};

//delete vacation
const deleteVacation = async (vacationId: string) => {
  const sql = `DELETE FROM vacations WHERE vacation_id = ${vacationId};`;
  return await dal_mysql.execute(sql);
};

const toggleFavorite = async (user_id: number, vacation_id: number) => {
  try {
    // Check if the vacation is already in the user's favorites
    const checkSql = `SELECT * FROM followers WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}`;
    const checkResult = await dal_mysql.execute(checkSql);

    if (checkResult.length > 0) {
      // Vacation is already in favorites,
      //remove it
      const deleteSql = `DELETE FROM followers WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}`;
      await dal_mysql.execute(deleteSql);

      return { message: "Removed from favorites" };
    } else {
      // Vacation is not in favorites, add it
      const insertSql = `INSERT INTO followers (user_id, vacation_id) VALUES (${user_id}, ${vacation_id})`;
      await dal_mysql.execute(insertSql);

      return { message: "Added to favorites" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//get folowers
const getFollowersCount = async () => {
  const sql = `SELECT vacation_id, COUNT(user_id) AS followers_count FROM followers GROUP BY vacation_id`;
  const result = await dal_mysql.execute(sql);
  return result;
};

//get userfollowers
// Fetch liked vacations for a user
const getUserLikedVacations = async (userId: number) => {
  const sql = `
     SELECT * 
    FROM vacations
    JOIN followers ON vacations.vacation_id = followers.vacation_id
    WHERE followers.user_id = ${userId};
  `;
  const result = await dal_mysql.execute(sql);

  const vacations = (result as Vacation[]).map((row) => {
    return new Vacation(
      row.destination,
      row.description,
      new Date(row.start_date),
      new Date(row.end_date),
      row.price,
      row.image_filename,
      row.vacation_id
    );
  });
  return vacations;
};

export {
  getVacationsByPage,
  addVacation,
  editVacation,
  deleteVacation,
  getFollowersCount,
  toggleFavorite,
  getUserLikedVacations,
};
