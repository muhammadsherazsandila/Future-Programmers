const mongoose = require('mongoose');
const debug = require('debug')("mongoose:developement")
require('dotenv').config();
mongoose.connect(process.env.DB_URI)
.then(()=>{debug("Connected To DB")})
.catch(()=>{debug("Failed To Connect To DB")})