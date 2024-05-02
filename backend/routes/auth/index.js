const express = require('express');
const { createNewUser, loginUser } = require('../../controllers/user.controller');
const { getToken } = require('../../utils/token');
const router = express.Router();

router.post('/login' , async (req, res)=>{
    try {
        const body = req.body
        const response = await loginUser({email: body.email, password : body.password})

        if(!response.success) throw new Error("Check Email or Password")
        const token = getToken(response.user)
        
        return res.send({success: true, user:response.user, token: token})
    } catch (error) {
        return res.send({success: false, error: error })
    }
})

router.post('/signup', async (req, res)=>{
    try {
        const userDetails = req.body
        const user = await createNewUser(userDetails,'Client')
        if(!user.success) throw new Error( "user is already exist" )
        const token = getToken(user.user)
        return res.send({success: true, user: user.user, token})
    } catch (error) {
        return res.send({success: false, message: "", error: error})
    }
})



module.exports = router