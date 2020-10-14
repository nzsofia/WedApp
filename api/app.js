import createError from "http-errors";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import cors from "cors";

//DB and Passport authentication
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import User from "./models/user.js";

//Routes
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import guestsRouter from "./routes/guests.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import musicRouter from "./routes/tracks.js";
import giftsRouter from "./routes/gifts.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

//configurations
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Session and authentication
app.use(session({
  secret: "I hope this will work.",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: ((1000 * 60) * 60) } //1 hour
}));
app.use(passport.initialize());
app.use(passport.session());

//Initialize database connection
mongoose.connect('mongodb://localhost:27017/weddingDB',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//initialize Passport authentication -> maybe put into separate file
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/guests", guestsRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/music", musicRouter);
app.use("/gifts", giftsRouter);

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

export default app;
