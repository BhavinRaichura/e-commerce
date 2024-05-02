const express = require('express')
const router = express.Router();

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const store = require('../../services/storage')

const { getAllProducts, getProductById } = require('../../controllers/product.controller')


// GET : all product list 
router.get('/', async (req, res)=>{
    try {
        const products = await getAllProducts()
        return res.send({success: true, data:products})
    } catch (error) {
        return res.send({success: false, error})
    }
})

// GET : /search?q=productName  : search product by tag
router.get('/search', (req, res)=>{
    
})

// GET : /:slug     :   get product by slug
router.get('/:productId', async (req, res)=>{
    try{
        const product = await getProductById(req.params.productId)
        product.imageUrl = []
        for(let image of product.images){
            const getObjectParams = {
                Bucket: process.env.AWS_BUCKET,
                Key : `${process.env.AWS_STORAGE_FOLDER}/${image}`
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(store, command);
            product.imageUrl.push(url)
        }
        
        return res.send({success: true, data: product})
    } catch (error) {
        return res.send({success: false, error: error.message})
    }
    
})




module.exports = router
