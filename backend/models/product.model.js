const dynamoose = require('dynamoose')

const propertiesSchema = new dynamoose.Schema({
    size: Number,
    price: Number,
    quantity: Number
});


const productSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true // Assuming id is the hash key
    },
    title: String,
    description: String,
    images: {
        type: Array,
        schema: [String] 
    },
    properties: {
        type: Array,
        schema: [propertiesSchema] 
    }
});

const Product = dynamoose.model('Product', productSchema )
module.exports = Product
