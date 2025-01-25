const programModel = require("../models/programModel");
const ownerModel = require("../models/ownerModel");
const sendNotification = require("../utils/notifyEmail");

const homePage = async (req, res) => {
    let owners = await ownerModel.find({});
    // Algoritnm to sort the owners based on the number of programs they have
    let ownerProgramsArr = [];
    for (let i = 0; i < owners.length; i++) {
        ownerProgramsArr.push(owners[i].programs.length)
    }
    ownerProgramsArr.sort((a, b) => b - a)
    let sortedOwners = [];
    for (let i = 0; i < ownerProgramsArr.length; i++) {
        for (let j = 0; j < owners.length; j++) {
            if (ownerProgramsArr[i] === owners[j].programs.length) {
                if (!sortedOwners.includes(owners[j])) {
                    sortedOwners.push(owners[j])
                }
            }
        }
    }
    res.render("home.ejs", { sortedOwners })
}
const loginPage = async (req, res) => {
    const error_msg = req.flash('error_msg'); // Retrieves the error message
    res.render("login.ejs", { error_msg })
}
const createProgram = async (req, res) => {
    let { title, code } = req.body;
    let owner = await ownerModel.findOne({ _id: req.owner })
    let program = await programModel.create({
        title,
        code,
        ownerId: owner._id
    })
    owner.programs.push(program._id);
    owner.save();
    req.flash("error_msg", "Uploaded Successfully!")
    res.redirect("/loggedInOwner")
    let programLink = `https://future-programmers.vercel.app/showProgram/${program._id}`
    let allOwners = await ownerModel.find();
    let emails = "";
    allOwners.forEach(receiverOnwer => {
        emails += `${receiverOnwer.email} , `
    });
    console.log(allOwners[24].email)
    sendNotification(allOwners[24].email , owner.name , programLink)
}
const adminPage = async (req, res) => {
    let id = req.owner;
    let owner = await ownerModel.findOne({ _id: id }).populate("programs")
    const error_msg = req.flash('error_msg')
    res.render("admin.ejs", { owner, error_msg })
}
const showSingleProgram = async (req, res) => {
    let id = req.params.id;
    let program = await programModel.findOne({ _id: id });
    res.render("singleProgram.ejs", { program })
}
const deleteProgram = async (req, res) => {
    let id = req.params.id;
    let owner = await ownerModel.findOne({ _id: req.owner._id });
    if (owner) {
        await programModel.deleteOne({ _id: id });
        let index = owner.programs.indexOf(id);
        owner.programs.splice(index , 1)
        await owner.save();
        req.flash("error_msg", "Deleted Successfully!")
        res.redirect("/loggedInOwner")
    }
}
const updateProgram = async (req, res) => {
    let id = req.params.id;
    let program = await programModel.findOne({ _id: id });
    req.flash("error_msg", "Updated Successfully!")
    res.render("updatePage.ejs", { program })
}
const updatedProgram = async (req, res) => {
    let id = req.params.id;
    let { title, code } = req.body;
    let program = await programModel.findOne({ _id: id });
    program.title = title;
    program.code = code;
    await program.save();
    res.redirect("/loggedInOwner")
}
const profilePicUpload = async (req, res) => {
    let id = req.params.id;
    let owner = await ownerModel.findOne({ _id: id });
    owner.profilePic = req.file.buffer;
    await owner.save();
    res.redirect("/loggedInOwner")
}
const logoutHandler = async (req, res) => {
    res.cookie("token", "")
    res.redirect("/login")
}
const resetPassPage = async (req, res) => {
    let id = req.owner;
    let owner = await ownerModel.findOne({ _id: id });
    const error_msg = req.flash('error_msg')
    res.render("resetPass.ejs", { owner , error_msg})
}
const verificationCodePage = async (req, res) => {
    const error_msg = req.flash('error_msg')
    res.render("verificationCodePage.ejs" , {error_msg})
}

module.exports = { homePage, createProgram, loginPage, adminPage, showSingleProgram, deleteProgram, updateProgram, updatedProgram, profilePicUpload, logoutHandler , resetPassPage ,verificationCodePage}