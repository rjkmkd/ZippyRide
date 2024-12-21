const express = require('express')
const cors = require('cors');
const connectDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js')
const app = express();

connectDB();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello Sherians");
})

app.use('/users',userRoutes)

module.exports = app;