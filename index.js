import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import colors from 'colors';
//import ConnectDB from './config/db.js';

dotenv.config();

//ConnectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

// D9CJmWDc6EOeQfej





const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Application is running in ${process.env.NODE_MODE} mode on port ${port}.`
      .bgGreen
  );
});
