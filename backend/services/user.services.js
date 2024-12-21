const User = require('../models/user.model.js')



module.exports.createUser =  async({userName, firstName, lastName, email, password}) =>{
    if(!userName || !firstName || !lastName || !email || !password){
        throw new Error("All fields are required")
    }
    const user = User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        userName,
        password
    })
    return user;
}