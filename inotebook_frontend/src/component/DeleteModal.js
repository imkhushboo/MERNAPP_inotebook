import React, { useContext } from 'react';
import NotesContext from "../context/notes/notesContext";


const DeleteModal = (props) => {
    const { deletenote } = useContext(NotesContext);
    return (
        <>
            <i className="fa-solid fa-trash" data-toggle="modal" data-target="#exampleModal1"></i>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Do you really want to delete the Note?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { deletenote(props.noteid) }}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal
