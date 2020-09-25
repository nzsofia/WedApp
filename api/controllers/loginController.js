

function login(req,res){
  console.log(req.body);
//  const userCandidate=JSON.parse(req.body);
  //check if there is a first name and last name in the guest database
  //if there is, and there is no userId, then he/she can register
  res.send({message: {code: 200, content: ""}});

}

export {login};
