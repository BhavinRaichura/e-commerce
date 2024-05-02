function adminAutherization (req, res, next) {
    try {
        console.log("role", res.locals.user)
        if(res.locals.user.role===process.env.ADMIN){
            return next()
        }
        throw new Error("Unautherized user")
    } catch (error) {
        return res.send({success: false, error: error.message})
    }
}

module.exports = adminAutherization