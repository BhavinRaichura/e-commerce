const express = require('express');
const { getUserCart, addToCart, removeFromCart } = require('../../../controllers/purches.controller');
const router = express.Router();

// GET : get cart
router.get('/', async (req, res)=>{
    try {
        const userId = res?.locals?.user?.userId
        console.log("user id: ",  userId)
        const cart = await getUserCart(userId)
        if(!cart) throw new Error("Unable to find cart")
        return res.send({success: true, data: cart})
    } catch (error) {
        return res.send({success: false, error: error})
    }  
})

// post : add-item to cart
router.post('/add-item', async (req, res)=>{
    try {
        const body = req.body
        const product = await addToCart({userId: req?.locals?.user?.userId, productId: body.productId, size: body.size, quantity: body.quantity})
        return res.send({success: true, data: product})
    } catch (error) {
        return res.send({success: false, error: error})
    }
})

// delete : remove-item from cart
router.delete('/remove-item', async (req, res)=>{
    try {
        const productId = req.query.productId
        const userId = req.locals.user.userId
        const response = await removeFromCart(productId, userId)
        return res.send(response)
    } catch (error) {
        return res.send({success: false, error})
    }
})



module.exports = router