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

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await User.findOne({email}).select('+password')
        if(!user){
           return res.status(401).json({message:"invalid user or password!"})
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ message: "invalid user or password!" });
        }
    
        const token = user.generateAuthToken();
        res.status(200).json({token, user})
    } catch (error) {
        console.log("something went wrong", error);
        
    }
}

// module.exports.getUserProfile = async (req,res,next) => {

// }