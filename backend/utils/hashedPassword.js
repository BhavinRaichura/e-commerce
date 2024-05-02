const bcrypt = require('bcrypt')
const saltRound = 10

const createHashedPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword
    } catch {
        throw new Error("Error in password hashing")
    }
}

const comparePassword = async (userPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(userPassword, hashedPassword)
        return isMatch
    } catch {
        throw new Error("Password not compared")
    }
}

module.exports = {
    createHashedPassword,
    comparePassword
}
