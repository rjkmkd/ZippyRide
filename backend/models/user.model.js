const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  fullName: {
    firstName:{
        type:String,
        require:true,
        minlength:[3,'First name must be at least 3 characters']
    },
    lastName:{
        type:String,
        // require:true,
        // minlength:[3,'First name must be at least 3 characters']
    }
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select:false
  },
  socketID:{
    type:String
  }
  
},
{
    timestamps:true
}
);

// generate authToken

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET
    )
    return token;
}

// compare password

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// hashing password

userSchema.statics.hashPassword = async function(password){
return await bcrypt.hash(password,10)
}

const User = mongoose.model('User',userSchema);

module.exports = User;