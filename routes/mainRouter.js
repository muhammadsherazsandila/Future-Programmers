const express = require('express');
const { homePage, createProgram, loginPage, adminPage, showSingleProgram, deleteProgram, showUpdatePage, updateProgram, updatedProgram, profilePicUpload, logoutHandler, resetPassPage, verificationCodePage } = require('../controllers/mainController');
const ownerAuthenticator = require('../middlewares/ownerAuth');
const { upload } = require('../utils/uploaPic');
const mainRouter = express.Router();

mainRouter.get("/", homePage)
mainRouter.get("/login", loginPage)
mainRouter.get("/loggedInOwner", ownerAuthenticator, adminPage)
mainRouter.get("/logout", ownerAuthenticator, logoutHandler)
mainRouter.post("/createProgram", ownerAuthenticator, createProgram)
mainRouter.get("/showProgram/:id", showSingleProgram)
mainRouter.get("/deleteProgram/:id", ownerAuthenticator, deleteProgram)
mainRouter.get("/updateProgram/:id", ownerAuthenticator, updateProgram)
mainRouter.post("/updatedProgram/:id", ownerAuthenticator, updatedProgram)
mainRouter.post("/uploadPic/:id", ownerAuthenticator, upload.single("profilePic"), profilePicUpload)
mainRouter.get("/resetOwnerPass", resetPassPage)
mainRouter.get("/verificationCode", verificationCodePage)

module.exports = mainRouter