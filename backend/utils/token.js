const jwt = require('jsonwebtoken')

const getToken = (user) => {
    try {
        const token = jwt.sign({
                userId: user?.id,
                name: user?.name,
                role: user?.role
            }, process.env.JWT_SECRET_KEY)
        
        return token
    } catch (error) {
        console.log("token creqation error: ", error)
        throw error
    }
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return data
    } catch (error) {
        console.log("token verification error: ", error)
        throw error
    }
}

module.exports = {
    getToken, 
    verifyToken
}