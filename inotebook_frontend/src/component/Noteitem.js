import React from 'react'
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const Noteitem = (props) => {
    const { notes } = props;
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
                <p className="card-text">{notes.description}</p>
                <div className="d-flex">
                    <div className="mr-auto p-2"><UpdateModal note={notes}></UpdateModal> </div>
                    <div className="p-2"><DeleteModal noteid={notes._id} /></div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
