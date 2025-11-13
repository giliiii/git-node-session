const jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
    const userHeader=req.headers.authorization || req.headers.Authorization 
    console.log(userHeader);
    console.log("aa");
    
    if(!userHeader?.startsWith('Bearer ')){
        return res.status(401).send("Unauthorization")
    }
    const token=userHeader.split(' ')[1]
    console.log("token"+token);
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err){
                console.log("gggg"+err);
                
                return res.status(405).send("Forbidden")}

            req.user=decoded
            next()
        }
    )
}
module.exports=verifyJWT