import createError from "http-errors";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

//Initialize database connection
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/weddingDB',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import guestsRouter from "./routes/guests.js";

const app = express();


const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/guests", guestsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//mongoose.connect('mongodb://localhost:27017/WeddingDB',{useUnifiedTopology: true, useNewUrlParser: true});

export default app;
