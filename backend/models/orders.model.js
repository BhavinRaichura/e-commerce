const dynamoose = require('dynamoose');

const itemsSchema = new dynamoose.Schema({
    productId: {
        type: String,
        required: true 
    },
    size: String, 
    price: Number,
    quantity: {
        type: Number,
        required: true 
    },
    
    product: {
        type: String,
        ref: 'Product' // Reference to the Product model
    }
});

const orderSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true 
    },
    userId: {
        type: String,
        required: true,
        index: {
            global: true,
            name:"user-order-index"
        } 
    },
    address: String,
    totalAmount: Number,
    isPlaced:{ 
        type: Boolean,
        default: false
    },
    isDelivered:{
        type: Boolean,
        default: false
    },
    isCanceled: {
        type: Boolean,
        default: false
    },
    items: {
        type: Array,
        schema: [itemsSchema], // Array of items, each conforming to itemsSchema
        required: true // Assuming items are required
    }
});

// Create model
const Orders = dynamoose.model("Orders", orderSchema);

module.exports = Orders;
