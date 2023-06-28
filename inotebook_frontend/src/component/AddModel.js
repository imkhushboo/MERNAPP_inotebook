import React, { useContext, useState, useEffect } from 'react';
import NotesContext from "../context/notes/notesContext";


const AddModel = () => {
    const { addnote } = useContext(NotesContext);
    const [notes1, setNotes1] = useState([]);
    const onChange = (e) => {
        setNotes1({ ...notes1, [e.target.name]: e.target.value });
        // console.log(notes1);
    }
    const handleClick = (e) => {
        e.preventDefault();
        addnote(notes1.title, notes1.description, notes1.tag);
        setNotes1({
            "title": "",
            "description": "",
            "tag": ""
        });
    }
    return (
        <>
            <i className="fa-solid fa-circle-plus" data-toggle="modal" data-target="#exampleModal"></i>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label" >Title:</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={notes1.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="description" name="description" onChange={onChange} value={notes1.description}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Tag:</label>
                                    <textarea className="form-control" id="tag" name="tag" onChange={onChange} value={notes1.tag}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}> Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModel
