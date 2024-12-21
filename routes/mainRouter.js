const express = require('express');
const { homePage, createProgram, loginPage, adminPage, showSingleProgram, deleteProgram, showUpdatePage, updateProgram, updatedProgram, profilePicUpload, logoutHandler } = require('../controllers/mainController');
const ownerAuthenticator = require('../middlewares/ownerAuth');
const { upload } = require('../utils/uploaPic');
const mainRouter = express.Router();

mainRouter.get("/" , homePage)
mainRouter.get("/login" , loginPage)
mainRouter.get("/loggedInOwner" , ownerAuthenticator , adminPage)
mainRouter.get("/logout" , logoutHandler)
mainRouter.post("/createProgram" , ownerAuthenticator , createProgram)
mainRouter.get("/showProgram/:id" , showSingleProgram)
mainRouter.get("/deleteProgram/:id" , ownerAuthenticator , deleteProgram)
mainRouter.get("/updateProgram/:id" , updateProgram)
mainRouter.post("/updatedProgram/:id" , updatedProgram)
mainRouter.post("/uploadPic/:id" , upload.single("profilePic") , profilePicUpload)

module.exports = mainRouter