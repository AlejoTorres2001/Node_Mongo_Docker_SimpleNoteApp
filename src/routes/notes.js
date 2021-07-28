const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const{isAuthenticated}=require('../helpers/auth')
router.get("/notes/add", isAuthenticated,(req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-notes",isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please insert a title" });
  }
  if (!description) {
    errors.push({ text: "Please insert a description" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const Newnote = new Note({ title, description });
    Newnote.user=req.user.id;
    await Newnote.save();
    req.flash('success_msg',"Agregado correctamente")
    res.redirect("/notes/notes");
  }
});
router.get("/notes/notes", isAuthenticated, async (req, res) => {
  const notes = await Note.find({user:req.user.id}).sort({ date: "desc" }).lean();
  res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id",isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("notes/edit-note", {note});
});
router.put("/notes/edit-note/:id",isAuthenticated, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  await Note.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { title: title, description: description } }
  );
  req.flash('success_msg',"Actualizado correctamente")
  res.redirect("/notes/notes");
});
router.delete("/notes/delete/:id",isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg',"Eliminado correctamente")
  res.redirect("/notes/notes");
});

module.exports = router;
