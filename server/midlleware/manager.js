const jwt=require('jsonwebtoken')

const manager = (req, res, next) => {
    const userHeader = req.headers.authorization || req.headers.Authorization

    if (!userHeader?.startsWith('Bearer ')) {
        return res.status(402).send("Unauthorization")
    }
    const token = userHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err)
                return res.status(405).send("Forbidden")
            if (decoded.roles !== "admin"){
                console.log(decoded.roles)
                console.log(decoded.username)
                return res.status(402).send("unathorized");

            }
                
            req.user = decoded
            next()
        }
    )
}
module.exports = manager
