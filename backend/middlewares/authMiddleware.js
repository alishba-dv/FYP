const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const authMiddleware=(req,res,next)=>{

    console.log("hi from middleware" );
    // const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    const token=req.cookies.token;
console.log("Token in auth middleware: ",req);
if(!token){
    console.log("No token auth required");
    return res.status(401).json({msg:"No token, authorization denied"});

}

try{
        console.log("hi try block" );

   

    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded;
    console.log("req.user form authiddleware: ",req.user);
    
    next();
    

}

catch(e){
    console.log("token is not valid");
    return res.status(400).json({msg:"Token is not valid"});

}



};

module.exports={authMiddleware};