import bodyPhaser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config";
import VacationsRouter from "./Routes/vacationsRouter";
import ErrorHandler from "./middleware/routeNotFound";
import loginRouter from "./Routes/loginRouter";
import reportsRouter from "./Routes/reportsRouter";
import bodyParser from "body-parser";


// Create server
const server = express();

//cors- cross origin research shearing
//cors=middleware
server.use(cors());
server.use(fileUpload());

//how to send data back (json/xml/string)
//tell server in which format to send back the data-json
server.use(express.json());

//where i will save files from upload
server.use(express.static("upload"));
//enable file uploading,
//and creating a path for the files if not existing
server.use(fileUpload({ createParentPath: true }));

//using routes=> localhost:8080/api/v1/vehicles
server.use("/api/v1/login", loginRouter); //login register
server.use("/api/v1/vacations", VacationsRouter); // get all and filters
server.use("/api/v1/reports", reportsRouter);

//404 handler
server.use("*", ErrorHandler);

//starting the server
server.listen(config.webPort, () => {
  console.log(`listening on http://${config.webHost}:${config.webPort}`);
});
