const express = require('express')
const router = express.Router();

const ordersRouter = require('./orders')
const cartRouter = require('./cart'); 
const userAuthentication = require('../../middlewares/userAuth.middleware');
const { getUserById } = require('../../controllers/user.controller');

router.use('/', userAuthentication)

router.use('/cart', cartRouter)
router.use('/orders', ordersRouter)


// details
router.get('/',async (req, res)=>{
    try {
        const user = await getUserById(res.locals.user.userId)
        if(!user) throw new Error("Unable to fetch user")
        delete user.password
        return res.send({success: 1, data: user})
    } catch (error) {
        res.send({success: 0, error: error.message})
    }
})

module.exports = router