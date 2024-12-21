const User = require('../models/user.model.js') 
const userService = require('../services/user.services.js')
const {validationResult} = require ('express-validator')
module.exports.registerUser = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {userName, fullName, email, password} = req.body;
    
    try {
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
          return res
            .status(409)
            .json({
              error: "Username already exists. Please choose a different one.",
            });
        }
    
    
        const hashedPassword = await User.hashPassword(password);
        const user = await userService.createUser({
            userName,
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            email,
            password:hashedPassword
        });
        const token = user.generateAuthToken();
        res.status(201).json({token, user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}