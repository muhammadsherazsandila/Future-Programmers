const ownerModel = require("../models/ownerModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const programModel = require("../models/programModel");
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
        req.flash("error_msg" , "Something went wrong!")
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
                req.flash('error_msg', 'Something went wrong!');
                res.redirect("/login")
            }
        })
    } else {
        req.flash('error_msg', 'Something went wrong!');
        res.redirect("/login")
    }
}
const singleOwner = async ( req , res )=>{
    let id = req.params.id;
    let owner = await ownerModel.findOne({_id : id}).populate("programs")
    res.render("singleOwnerPage.ejs" , {owner})
    
}
module.exports = { dashboard, createOwner, loginOwner , singleOwner}

