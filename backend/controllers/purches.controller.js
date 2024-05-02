const User = require('../models/user.model')
const Product = require('../models/product.model');
const Orders = require('../models/orders.model');

const addToCart = async ({userId, productId, size, quantity}) => {
    try {
        // Find the user by userId
        let user = await User.get(userId);

        // Find the product by productId
        let product = await Product.get(productId);
        let item = product.properties.find((property)=> property.size===size && property.quantity >= quantity)
        
        if(!item) return { success: false, message: "Product quantity is not available" }

        // Add the product to the user's cart
        user.cart.push({
            productId: productId,
            size: size,
            price: product.properties.find(prop => prop.size === size).price,
            quantity: quantity
        });

        // Save the updated user object
        await user.save();
        return user.cart
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error
    }

}

const removeFromCart = async (userId, productId) => {
    try {
        // Find the user by userId
        let user = await User.get(userId);

        // Remove the product from the user's cart
        user.cart = user.cart.filter(item => item.productId !== productId);

        // Save the updated user object
        await user.save();
        return user.cart
        //return { success: true, message: 'Product removed from cart successfully' };
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error
    }
}

const getUserCart = async (userId) => {
    try {
        // Find the user by userId
        let user = await User.get(userId);
        return user.cart;
    } catch (error) {
        console.error('Error fetching user cart:', error);
        return error
    }
}

const getUserOrder = async (userId) => {
    try {
        // Find orders for the user
        let orders = await Orders.scan('userId').eq(userId).exec();
        return orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return error;
    }
}

const getUserOrderHistory = async (userId) => {
    try {
        // Find orders history for the user
        let user = await User.get(userId);
        return user.history;
    } catch (error) {
        console.error('Error fetching user order history:', error);
        return error;
    }
}

const cancelOrder = async (userId, orderId) => {
    try {
        // Find the order by orderId and userId
        let order = await Orders.get(orderId);

        // Check if the order belongs to the user
        if (order.userId !== userId) {
            throw new Error('You are not authorized to cancel this order')
        }

        if(!order.isProcess){
            throw new Error("Order is already delivered. Noww you cannot make cancel it.")
        }

        // Update the order status to canceled
        order.isCanceled = true;

        // Save the updated order object
        await order.save();

        return order
    } catch (error) {
        console.error('Error canceling order:', error);
        throw error
    }
}


const placeOrder = async (userId, address) => {
    try {
        // Get user details
        const user = await User.get(userId);

        // Get cart items from user details
        const cartItems = user.cart;

        // Calculate total amount for the order
        let totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Check if quantities are available for all items in the cart
        for (const item of cartItems) {
            const product = await Product.get(item.productId);
            const productSize = item.size;
            const productQuantity = item.quantity;

            // Check if the product size and quantity are available
            const productSizeAvailable = product.properties.find(prop => prop.size === productSize && prop.quantity >= productQuantity);

            // If any product is not available, return error
            if (!productSizeAvailable) {
                throw new Error("Product '" + product.title + "' is not available in required quantity" );
                
            }
        }

        // All products are available, proceed with placing the order
        const newOrder = new Orders({

            userId: userId,
            address: address,
            totalAmount: totalAmount,
            items: cartItems
        });

        // Save the new order
        await newOrder.save();

        // Update product quantities and remove items from user's cart
        for (const item of cartItems) {
            const product = await Product.get(item.productId);
            const productSize = item.size;
            const productQuantity = item.quantity;

            const productSizeToUpdate = product.properties.find(prop => prop.size === productSize);
            productSizeToUpdate.quantity -= productQuantity;

            // Save the updated product
            await product.save();
        }

        // Clear user's cart
        user.cart = [];
        await user.save();

        // Add order to user's history
        user.history.push({
            orderId: newOrder.id,
            order: newOrder
        });
        await user.save();
        return newOrder
        //return { success: true, message: 'Order placed successfully', orderId: newOrder.id };
    } catch (error) {
        console.error('Error placing order:', error);
        throw error
    }
}

const getOrderById = (orderId) => {
    
}

module.exports = {
    addToCart,
    removeFromCart,
    getUserCart,
    getUserOrder,
    getUserOrderHistory,
    cancelOrder,
    placeOrder,
    //getAllOrders,
    getOrderById,
};
