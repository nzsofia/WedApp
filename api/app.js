import createError from "http-errors";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

// DB and Passport authentication
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import User from "./models/user.js";

// Routes
import indexRouter from "./routes/index.js";
import guestsRouter from "./routes/guests.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import musicRouter from "./routes/tracks.js";
import giftsRouter from "./routes/gifts.js";
import logoutRouter from "./routes/logout.js";
import menuRouter from "./routes/menu.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

//configurations
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './build')));

// Session and authentication
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: ((1000 * 60) * 60) } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize database connection
mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Initialize Passport authentication -> maybe put into separate file
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/home', indexRouter);
app.use("/guests", guestsRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/music", musicRouter);
app.use("/gifts", giftsRouter);
app.use("/logout", logoutRouter);
app.use("/menu", menuRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'./build/index.html'));
});

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
