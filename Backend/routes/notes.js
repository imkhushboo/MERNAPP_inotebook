const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1:
router.get("/fetchuser", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.json(notes);
    } catch (err) {
        return res.status(500).send({ error: "error krdiya!!" });
    }
});

//Route 2

router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Enter valid title").isLength({ min: 5 }),
        body("description", "Enter a valid Description").isLength({ min: 10 }),
    ],
    async (req, res) => {
        const result = validationResult(req);
        console.log(req.body);
        if (!result.isEmpty()) {
            return res.status(500).send({ error: "error" });
        }
        try {
            const { title, description, tag } = req.body;
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savednotes = await note.save();
            //   console.log("kyun error aari");
            return res.json(savednotes);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "error aagyi" });
        }
    }
);

//Route 3:

router.put("/update/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
        newnote.title = title;
    }
    if (description) {
        newnote.description = description;
    }
    if (tag) {
        newnote.tag = tag;
    }
    try {
        let note = await Notes.findById(req.params.id);
        console.log(note);
        console.log(req.user);
        if (!note) res.status(404).send("not exists");

        if (note.user.toString() !== req.user.id) {
            res.status(401).send("error");
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newnote },
            { new: true }
        );
        res.json(note);
    } catch (err) {
        res.status(401).send("Error");
    }
});

// Route 4 :DELETE

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("not exists");

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("error");
        }
        console.log("nhi ho paya delet!");
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "Node has been deleted" });
    } catch (err) {
        return res.status(500).send({ err: "error" });
    }
});

module.exports = router;
