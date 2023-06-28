import React, { useContext, useState } from 'react'
import NotesContext from '../context/notes/notesContext';

const UpdateModal = (props) => {
    const { editnote } = useContext(NotesContext);

    const { note } = props;
    const [mnote, setMnote] = useState(note);

    const onChange = (e) => {
        setMnote({ ...mnote, [e.target.name]: e.target.value });
    }
    const handleClick = () => {
        editnote(mnote._id, mnote.title, mnote.description, mnote.tag);
    }

    return (
        <>
            < i className="fa-solid fa-pen-to-square" data-toggle="modal" data-target="#exampleModal2"></i>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label" >Title:</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={mnote.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="description" name="description" onChange={onChange} value={mnote.description}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Tag:</label>
                                    <textarea className="form-control" id="tag" name="tag" onChange={onChange} value={mnote.tag}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateModal
