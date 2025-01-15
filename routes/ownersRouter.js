const express = require('express');
const { dashboard, createOwner, loginOwner, verifyCode, singleOwner ,verifyCodePage , resetPassword} = require('../controllers/ownerController');
const ownerAuthenticator = require('../middlewares/ownerAuth');
const ownerRouter = express.Router();

ownerRouter.get("/" , dashboard)
ownerRouter.post("/register" , createOwner)
ownerRouter.post("/login" , loginOwner)
ownerRouter.get("/:id" , singleOwner)
ownerRouter.post("/verifyCodePage" , verifyCodePage)
ownerRouter.post("/verifyCode" ,  verifyCode)
ownerRouter.post("/resetPassword"  , resetPassword)
module.exports = ownerRouter