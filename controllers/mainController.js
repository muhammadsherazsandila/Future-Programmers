const programModel = require("../models/programModel");
const ownerModel = require("../models/ownerModel");

const homePage = async (req, res) => {
    let owners = await ownerModel.find();
    res.render("home.ejs", { owners })
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
    req.flash("error_msg" , "Uploaded Successfully!")
    res.redirect("/loggedInOwner")
}
const adminPage = async (req, res) => {
    let id = req.owner;
    let owner = await ownerModel.findOne({ _id: id }).populate("programs")
    const error_msg = req.flash('error_msg')
    res.render("admin.ejs", { owner , error_msg})
}
const showSingleProgram = async (req, res) => {
    let id = req.params.id;
    let program = await programModel.findOne({ _id: id });
    res.render("singleProgram.ejs", { program })
}
const deleteProgram = async (req, res) => {
    let id = req.params.id;
    await programModel.deleteOne({ _id: id });
    // flash message ....
    res.redirect("/loggedInOwner")
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
module.exports = { homePage, createProgram, loginPage, adminPage, showSingleProgram, deleteProgram, updateProgram, updatedProgram, profilePicUpload, logoutHandler }