import passport from "passport";

function home(req,res){

  res.send({message: {code: 200, content: "Everything ok."}});
}

export {home};
