var jwt = require('jsonwebtoken')

var JWT_SECRET = 'fgvuywgfiuwofrioiuwcuyfbgawiepfvbhibhwvfguscfavuawgefmjoupokewv'
module.exports = function(req,res,next){

    token = req.header('JWT-Auth')
    if(!token){res.status(401).json({'msg':'Access denied'});return}
    try{
        req.verified_ph_no = jwt.verify(token,JWT_SECRET).ph_no
        next()
    }catch{
        res.status(401).json({'msg':'Token expired'})
        return
    }
}