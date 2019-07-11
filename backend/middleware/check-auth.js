
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,'secert_this_should_be_longer');
    req.userData = {
      username:decodedToken.username,
      userId:decodedToken.userdId
    }
    next()
  }catch(error){
    res.status(401).json({message:"You Are not authenticated"})
  }

}

