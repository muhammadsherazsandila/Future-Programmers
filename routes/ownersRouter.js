const express = require('express');
const { dashboard, createOwner, loginOwner, showSingleProgram, singleOwner } = require('../controllers/ownerController');
const ownerRouter = express.Router();

ownerRouter.get("/" , dashboard)
ownerRouter.post("/register" , createOwner)
ownerRouter.post("/login" , loginOwner)
ownerRouter.get("/:id" , singleOwner)

module.exports = ownerRouter