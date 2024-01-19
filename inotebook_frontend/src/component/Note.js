import React, { useEffect } from "react";
import { useContext } from "react";
import Noteitem from './Noteitem';
import NotesContext from "../context/notes/notesContext";
import AddModel from "./AddModel";
import { useNavigate } from "react-router-dom";

const Note = () => {
    const { notes, getnotes } = useContext(NotesContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(notes);
        if (localStorage.getItem('token')) {
            getnotes();
        }
        else {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-end"><AddModel /></div>
                <div className="d-flex justify-content-center"><h1>Your Notes </h1></div></div>
            <div className="container my-3">
                <div className="row">
                    {notes.map((notes) => {
                        return (
                            <div className="col-md-4" key={notes._id}>
                                <Noteitem notes={notes} />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>

    );
};

export default Note;
