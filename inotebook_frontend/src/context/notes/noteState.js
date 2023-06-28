import React, { useState } from "react";
import NotesContext from "./notesContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notes1 = []
    const [notes, setNotes] = useState(notes1);

    const getnotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchuser`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },

            // body: JSON.stringify({ }),
        });
        const json = await response.json();
        setNotes(json);
        console.log("fetched data");
    }

    const addnote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },

                body: JSON.stringify({ title, description, tag }),
            });
            if (response.status === 500) {
                return console.log("error");
            }
            const { _id, user } = await (response.json());
            console.log(_id, user);
            const newnote = {

                "_id": _id,
                "user": user,
                "title": title,
                "description": description,
                "tag": tag,
                "__v": 0
            }
            setNotes(notes.concat(newnote));

        }
        catch (err) {
            console.error(err.message);
        }

    }
    const deletenote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/delete/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });
            if (response.status === 500) {
                return console.log("error")
            }
            const newnote = notes.filter((notes) => { return notes._id !== id });
            setNotes(newnote);
        } catch (err) {
            return console.log(err.message);
        }


    }

    const editnote = async (id, title, description, tag) => {
        console.log(id);
        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },

            body: JSON.stringify({ title, description, tag }),
        });

        const json = response.json();
        console.log(json);
        const newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newnotes.length; index++) {
            // const note = notes[index];
            if (newnotes[index]._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setNotes(newnotes);
        console.log(notes);
    }

    return (
        <NotesContext.Provider value={{ notes, setNotes, addnote, deletenote, getnotes, editnote }}>
            {props.children}
        </NotesContext.Provider>
    );
};

export default NoteState;
