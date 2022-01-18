const express = require("express");
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Note");
const router = express.Router();

// Get all the notes
router.get("/api/notes/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const allnotes = await Notes.find({ user: req.user });
        return res.status(200).json(allnotes);
    }
    catch (err) {
        return res.status(400).json("Some error to fetch all notes " + err);
    }
});


// Add notes
router.post("/api/notes/addnote", fetchuser, [
    body('title').exists(),
    body('description').exists()
], async (req, res) => {
    let success = false;
    // If there are any errors
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array() });
        }
        const { title, description, tag } = req.body;

        const notes = new Notes({
            title, description, tag, user: req.user
        });

        const saveNotes = await notes.save();
        if (!saveNotes) {
            return res.status(400).json({ success, error: "Some error to add notes" });
        }
        success = true;
        return res.status(200).json({ success, solve: "Note Added", saveNotes });
    }
    catch (err) {
        return res.status(400).json({ success, error: "Some error occured to add a note " + err });
    }
})

// Update notes
router.put("/api/notes/updatenote/:id", fetchuser, async (req, res) => {
    let success = true;
    try {
        const { title, description, tag } = req.body;

        const updateNote = {};
        if (title) { updateNote.title = title }
        if (description) { updateNote.description = description }
        if (tag) { updateNote.tag = tag }

        // Find note to be updated and update it
        const authUser = await Notes.findById(req.params.id);
        if (!authUser) { return res.status(404).json({ success, error: "Not Found" }) }

        // Allow updation only if user owns this note
        if (authUser.user.toString() !== req.user) {
            return res.status(400).json({ success, error: "Not Allowed" });
        }

        // update
        const note = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });
        if (!note) {
            return res.status(400).json({ success, error: "Some error to update note" });
        }
        success = true;
        return res.status(200).json({ success, solve: "Note Updated", note });
    }
    catch (err) {
        return res.status(400).json({ success, error: "Some error to update note " + err });
    }
});


// Delete notes
router.delete("/api/notes/deletenote/:id", fetchuser, async (req, res) => {
    let success = false;
    try {
        // Find note to be delete and delete it
        const findNote = await Notes.findById(req.params.id);
        if (!findNote) { return res.status(404).json({ success, error: "Note not found" }) }

        // Allowed deletion only if user owns this note
        if (findNote.user.toString() !== req.user) { return res.status(400).json({ success, error: "Not allowed" }) }

        // delete
        const deleteNote = await Notes.findByIdAndDelete(req.params.id);
        if (!deleteNote) { return res.status(400).json({ success, error: "Some error to delete note" }) }
        console.log("Deleted");
        success = true;
        return res.status(200).json({ success, solve: "Note Deleted", deleteNote });
    }
    catch (err) {
        console.log("Some error " + err);
        return res.status(400).json({ success, error: "Some error to delete note " + err });
    }
})

module.exports = router;