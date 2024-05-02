const dynamoose = require('dynamoose')

const itemSchema = new dynamoose.Schema({
    orderId: { type: String, required: true },
    order: { type: String, ref: 'Order' } // Reference to Order model
})

const cartItem = new dynamoose.Schema({
    productId: { type: String, ref: 'Product' }, // Reference to Product model
    size: String,
    price: Number,
    quantity: Number
})

const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true, 
    },
    name: String,
    email: {
        type: String,
        index: {
            global: true,
            //project: true, // Include email in the index projection
            name: 'email-index', // Name of the secondary index
            
        }
    },
    password: String,
    address: { 
        type: String,
        required: false,
        default: "",
    },
    role: {
        type: String,
        enum: ["Client", "Admin"],
        default: "Client",
        required:false
    },
    
    orders: {
        type: Array,
        schema: [itemSchema],
        default: [],
        required:false
    },
    
    history: {
        type: Array,
        schema: [itemSchema],
        default: [],
        required:false
    }, 
    cart: {
        type: Array,
        schema: [cartItem],
        default: [],
        required: false
    }
});
const User = dynamoose.model("User", userSchema)
module.exports = User