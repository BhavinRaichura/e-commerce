const express = require('express')
const router = express.Router();

// get : all orders
router.get('/', (req, res)=>{
    return res.send("user order page")
})

// get : history
router.get('/history', (req, res)=>{

})

// get : invoices
router.get('/:orderid', (req, res)=>{

})

// post : payment 
router.post('/:orderid/pay', (req, res)=>{

})

// put : cancel order
router.put('/:orderid/cancel', (req, res)=>{
    
})



module.exports = router