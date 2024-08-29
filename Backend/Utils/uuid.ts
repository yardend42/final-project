import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const handleFileUpload = async (file: UploadedFile): Promise<string> => {
  // Generate a unique filename for the image using UUID
  const uniqueFileName = `${uuidv4()}${path.extname(file.name)}`;

  // Set the upload path
  const uploadPath = path.join(
    __dirname,
    "../uploads/vacationImg",
    uniqueFileName
  );

  // Move the file to the path using promise async action
  await new Promise<void>((resolve, reject) => {
    file.mv(uploadPath, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });

  // Return the unique filename to be saved in the database
  return uniqueFileName;
};

export { handleFileUpload };
