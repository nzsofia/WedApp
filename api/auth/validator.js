import passport from "passport";

function validator(req, res, next) {

  //check if user is authenticated
  if (req.user) { //req.isAuthenticated() also works
    console.log("[validator] User is logged in.");
    return next();
  }
  else {
    console.log("[validator] User is not logged in.");
    res.send({message: {code: 401, content: "You are not logged in."}});
  }
}

export { validator };
