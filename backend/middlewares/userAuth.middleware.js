const { verifyToken } = require('../utils/token')

function userAuthentication (req, res, next) {
    try {
        // req.locals.variable = some_value_pass_to_API
        token = req.headers.token
        if(!token) throw new Error("User is not login")
        const data = verifyToken(token)
        if(!data) throw new Error("User Authentication Failled..!")
        res.locals.user = data // passing USER-Role and USER-ID to next API
        return next()
    } catch (error) {
        return res.send({success: false, error: error.message})
    }
}


module.exports = userAuthentication