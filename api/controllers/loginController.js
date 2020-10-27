import User from "../models/user.js";
import passport from "passport";

function login(req, res, next) {

  // check if user exist and password is correct
  passport.authenticate('local', function (err, user, info) {

     if(err) {
       res.send({message: {code: 404, content: "Email address or password incorrect. Please try again!"}});
     } else {

      if (! user) {
        res.send({message: {code: 404, content: "Email address or password incorrect. Please try again!"}});
      } else {

        console.log("[login] login");
        // log user in and create cookie
        req.logIn(user, function(loginErr) {

          if(loginErr) {
            res.send({message: {code: 404, content: "Email address or password incorrect. Please try again!"}});
          }
          else {
            console.log("[login] You are authenticated.");
            // req.session.cookie.id = req.user._id;
            req.session.cookie.username = req.user.username;

            // User is authenticated and logged in
            res.send({message: {code: 200, content: "Everything ok."}});
          }
        });
      }
     }
   })(req, res, next);
}

export { login };
