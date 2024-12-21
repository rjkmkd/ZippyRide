const mongoose = require('mongoose')
const connectDB = async()=>{
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/uber`);
        console.log(`\n MONGODB CONNECTED!! DB HOST:${dbInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED!!",error);
        process.exit(1);
    }
}
module.exports = connectDB;