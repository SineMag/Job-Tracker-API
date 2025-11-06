// import express, {Request, Response, application } from "express";

// require('dotenv').config();

// const express = require('express')
// const app = express()

// const PORT = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// })

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })

// startServer();

import express, { application } from "express";
import path from "path";
import dotenv from "dotenv";
import { log } from "console";
import { testDBConnection } from "./config/database";
import applicationRoutes from "./routes/applicationRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  await testDBConnection();
  app.use(express.json());

  //serve static files
  app.use(express.static(path.join(__dirname, "public"))); //the public folder is the statis folder which contains all the static files like css, js , images etc
  app.use("/api/auth", authRoutes);
  app.use("/api", applicationRoutes);
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

  app.use("/api", applicationRoutes); // add request, response and next parameters and an error handling middleware. import Next:NextFunction from express..
  // //res.status(404).json({message: 'Not Found,Internal Server Error', success: false});
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
