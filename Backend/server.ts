import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./utils/config";
import VacationsRouter from "./routes/vacationsRouter";
import ErrorHandler from "./middleware/routeNotFound";
import loginRouter from "./routes/loginRouter";
import reportsRouter from "./routes/reportsRouter";
import path from "path";

// Create server
const server = express();

//cors=middleware
server.use(cors());

// Serve static files from the "public" directory
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

//tell server in which format to send back the data-json
server.use(express.json());

//where i will save files from upload
server.use(express.static("upload"));
//enable file uploading, and creating a path for the files if not existing
server.use(fileUpload({ createParentPath: true }));

//using routes=> localhost:8080/api/v1/
server.use("/api/v1/login", loginRouter); //login register
server.use("/api/v1/vacations", VacationsRouter); // get all and filters
server.use("/api/v1/reports", reportsRouter);

//404 handler
server.use("*", ErrorHandler);

//starting the server
server.listen(config.webPort, () => {
  console.log(`listening on http://${config.webHost}:${config.webPort}`);
});
