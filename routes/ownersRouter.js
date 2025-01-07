const express = require('express');
const { dashboard, createOwner, loginOwner, resetOwnerPass, singleOwner ,verifyCodePage , resetPassword} = require('../controllers/ownerController');
const ownerAuthenticator = require('../middlewares/ownerAuth');
const ownerRouter = express.Router();

ownerRouter.get("/" , dashboard)
ownerRouter.post("/register" , createOwner)
ownerRouter.post("/login" , loginOwner)
ownerRouter.get("/:id" , singleOwner)
ownerRouter.post("/verifyCodePage" , verifyCodePage)
ownerRouter.post("/verifyCode" , ownerAuthenticator,  resetOwnerPass)
ownerRouter.post("/resetPassword" , ownerAuthenticator , resetPassword)
module.exports = ownerRouter