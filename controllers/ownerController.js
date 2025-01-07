const ownerModel = require("../models/ownerModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const programModel = require("../models/programModel");
const sendVerificationEmail = require("../utils/verifyEmail");
require("dotenv").config();
const dashboard = async (req, res) => {
    res.send("Hello owner");
}
const createOwner = async (req, res) => {
    let { name, email, password } = req.body;
    let exitedOwner = await ownerModel.findOne({ email: email });
    if (!exitedOwner) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                let owner = await ownerModel.create({
                    name,
                    email,
                    password : hash
                })
                let token = jwt.sign({ email: owner.email, _id: owner._id }, process.env.JWT_KEY)
                res.cookie("token", token)
                res.redirect("/loggedInOwner")
            })
        })
    } else {
        req.flash("error_msg" , "Email already exists!")
        res.redirect("/login")
    }
}
const loginOwner = async (req, res) => {
    let { email, password } = req.body;
    let owner = await ownerModel.findOne({ email: email });
    if (owner) {
        bcrypt.compare(password, owner.password, function (err, result) {
            if (result) {
                let token = jwt.sign({ email: owner.email, _id: owner._id }, process.env.JWT_KEY)
                res.cookie("token", token)
                res.redirect("/loggedInOwner")
            }
            else {
                req.flash('error_msg', 'Wrong Password!');
                res.redirect("/login")
            }
        })
    } else {
        req.flash('error_msg', 'Wrong Email!');
        res.redirect("/login")
    }
}
const singleOwner = async ( req , res )=>{
    let id = req.params.id;
    let owner = await ownerModel.findOne({_id : id}).populate("programs")
    res.render("singleOwnerPage.ejs" , {owner})
    
}
const verifyCodePage = async (req, res) => {
    let { email } = req.body;
    let owner = await ownerModel.findOne({
        email: email
    });
    if (owner) {
        let verificationCode = Math.floor(Math.random() * 1000000);
        owner.verificationCode = verificationCode;
        await owner.save();
        sendVerificationEmail(owner.email, verificationCode);
        let token = jwt.sign({ email: owner.email, _id: owner._id }, process.env.JWT_KEY)
        res.cookie("token", token)
        res.redirect("/verificationCode")
    } else {
        req.flash('error_msg', 'Wrong Email!');
        res.redirect("/login")
    }
}
const resetOwnerPass = async (req, res) => {
    let { code } = req.body;
    let owner = await ownerModel.findOne({ verificationCode: code });
    if (owner) {
        res.redirect("/resetOwnerPass")
    } else {
        req.flash('error_msg', 'Wrong Code!');
        res.redirect("/verificationCode")
    }

}
const resetPassword = async (req, res) => {
    let id = req.owner;
    let {newPassword , confirmPassword} = req.body;
    if(newPassword === confirmPassword){
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newPassword, salt, async function (err, hash) {
                let owner = await ownerModel.findOne({_id : id});
                owner.password = hash;
                owner.verificationCode = "";
                await owner.save();
                req.flash('error_msg', 'Password Changed Successfully!');
                res.redirect("/login")
            })
        })
    }
    else{
        req.flash('error_msg', 'Confirm Password not matched!');
        res.redirect("/resetOwnerPass")
    }



}
module.exports = { dashboard, createOwner, loginOwner , singleOwner , resetOwnerPass , verifyCodePage , resetPassword}

