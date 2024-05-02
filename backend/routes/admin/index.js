const express = require('express')
const multer = require('multer')
const fs = require('fs')
const { addProduct, updateProduct } = require('../../controllers/product.controller')
// const {} = require('../../controllers/purches.controller');
const userAuthentication = require('../../middlewares/userAuth.middleware');
const adminAutherization = require('../../middlewares/adminAuth.middleware');
const store = require('../../services/storage');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const router = express.Router();

router.use('/', userAuthentication)
router.use('/', adminAutherization)

const upload = multer({dest: 'upload/'})


// get : user details
router.get('/user/:userid',(req, res)=>{
    
})

// post : add new product
router.post('/product/add-item', upload.single('productImage') , async (req, res)=>{
    try{
        
        const time = new Date().getTime().toString()
        const productImage = fs.readFileSync(req.file.path)
        let imageName = `IMG-${time}.jpg`
        const imageParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${process.env.AWS_STORAGE_FOLDER}/${imageName}`,
            Body: productImage
        }
        
        const putImageCommand = new PutObjectCommand(imageParams)
        const uploadRes = await store.send(putImageCommand)
        
        let productDetails = req.body
        productDetails.images = [imageName]
        
        
        console.log(productDetails.title)
        const product = await addProduct({...productDetails})
        console.log("product : ",product)

        return res.send({success: true, data: product})
    } catch (error) {
        console.log("error: ", error)
        return res.send({success: 0, error: error.message})
    }

})

// put : update product
router.put('/products/:productid', async (req, res) => {
    try {
        const productDetail = req.body;
        productDetail.id = req.params.productid
        const product = await updateProduct(productDetail)
        return res.send({success:true, data: product})
    } catch (error) {
        return res.send({success:false, error: error.message})
    }
})

// delete : delete product
router.delete('/products/:productid', (req, res)=>{
    res.send({message : "API is in development stage"})
})


// get : all oreders 
router.get('/orders', (req, res)=>{
    
})

// patch : approve delievery 
router.patch('/orders/approve/:orderid',(req, res)=>{
    
})


// patch : reject delivery
router.patch('/orders/reject/:orderid',(req, res)=>{

})


router.get('/', (req,res)=>{
    return res.send("admin page")
})

module.exports = router