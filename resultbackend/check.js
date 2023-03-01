const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization
        console.log(token);
        const verify=jwt.verify(token,"this is dummy text")
        console.log(verify);
        next()
    }catch(e){
        return res.status(401).json({
            msg:"invalid tpken"
        })
    }
}