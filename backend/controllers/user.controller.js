const User = require('../models/user.model');
const generateEmailHash = require('../utils/generateUserId');
const {comparePassword, createHashedPassword} = require('../utils/hashedPassword')

const getUserById = async (userId) => {
    try {
        const userDetails = await User.get({"id": userId});
        if (!userDetails) {
            throw new Error('User not found');
        }
        delete userDetails.password;
        return { success: true, user: userDetails};
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

const createNewUser = async (userInfo, role='Client') => {
    try {
        const users = await User.query('email').eq(userInfo.email).exec() 
        //const user = await data[0]
        if (users.length>0) {
            throw new Error("User is already exist.")
        }

        const password = await createHashedPassword(userInfo.password)
        const userId = generateEmailHash(userInfo.email)

        let newUser = await User.create({
            id:userId, 
            name: userInfo.name, 
            email: userInfo.email, 
            password: password, 
            address: userInfo?.address, 
            role: role, 
        });
        console.log(newUser)

        delete newUser.password;
        return {
            success: true,
            user: {
                userId: newUser.id,
                name: newUser.name,
                role: newUser.role
            }
        };
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
}



const loginUser = async ({email, password}) => {
    try {
        console.log(email)
        const data = await User.query('email').eq(email).exec() 
        const user = data[0] 
        // const user  =  await User.get({"email-index": email})
        console.log("user: ", user.name)

        const isSuccess = await comparePassword(password, user.password)
        if(isSuccess===false){
            throw new Error("User email or passsword is wrong")
        }
        delete user.password
        return {success: true, user:user}
    } catch (error) {
        console.log("error: ", error)
        throw error
    }
}


module.exports = {
    getUserById,
    createNewUser,
    loginUser
};
