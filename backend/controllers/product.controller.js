const Product = require('../models/product.model');


const getProductById = async (productId) => {
    try {
        const product = await Product.get({"id": productId});
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
}

const getAllProducts = async () => {
    try {
        const products = await Product.scan().limit(10).exec();
        return products;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
}

const addProduct = async ({title, description, images, properties}) => {
    console.log("reached")
    try {
        const uniqueId = generateUniqueId()
        console.log("prod: ", uniqueId)
        const id = `PROD$${uniqueId}`
        const newProduct = await Product.create({
            "id": id,
            "title": title,
            "description": description,
            "images": images,
            "properties": properties
        });

        return newProduct;
    } catch (error) {
        console.error('Error adding new product:', error);
        throw error;
    }
}

const updateProduct = async (product) => {
    try {
        const updatedProduct = await Product.update(
            {"id": product?.id},
            {
                "title": product.title,
                "description": product.description,
                "images": [...product.images],
                "properties": [...product.properties]
            },
            {"returnValues": 'ALL_NEW'}
        );
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return timestamp + random;
}


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct
};
