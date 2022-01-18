import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Profile from './Profile';
import Editprofile from './Editprofile';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

const Notes = (props) => {
    let history = useHistory();
    const context = useContext(noteContext);
    const { notes, getAllNotes, updateNote, getData, state } = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const [userDetail, setUserDetail] = useState({});
    const [updateNoteState, setUpdateNoteState] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    // get note from noteitem component
    const updateNoteFun = (note) => {
        ref.current.click();
        setUpdateNoteState({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
    }

    // set updated values
    const setUpdatenNote = (e) => {
        setUpdateNoteState({ ...updateNoteState, [e.target.name]: e.target.value });
    }

    // send updated note
    const sendUpdate = () => {
        refClose.current.click();
        updateNote(updateNoteState.id, updateNoteState.etitle, updateNoteState.edescription, updateNoteState.etag);
    }

    // Favourite
    const handleFav = (note) => {
        let noteObj = [];
        let getNote = localStorage.getItem("Fav-Notes");
        if (getNote === null) {
            noteObj = [];
        }
        else {
            noteObj = JSON.parse(getNote);
        }
        for (let i = 0; i < noteObj.length; i++) {
            if (noteObj[i]._id === note._id) {
                props.showAlert("This note is already in favourite list", "warning");
                return;
            }
        }
        noteObj.push(note);
        localStorage.setItem("Fav-Notes", JSON.stringify(noteObj));
        props.showAlert("Note added to favourite list", "success");
    }

    useEffect(async () => {
        { localStorage.getItem('token') ? getAllNotes() : history.push("/login") }
        const res = await getData();
        setUserDetail(res);
    }, []);

    useEffect(async () => {
        const res = await getData();
        setUserDetail(res);
    }, [state]);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <Addnote />
                        <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                            Launch demo modal
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ outline: "none" }}>
                                            <CloseIcon aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form method="post" id="myUpdateForm">
                                            <input className="myInput" type="text" name="etitle" id="etitle" placeholder="Title" value={updateNoteState.etitle} onChange={setUpdatenNote} />
                                            <input className="myInput" type="tag" name="etag" id="etag" placeholder="Tag" value={updateNoteState.etag} onChange={setUpdatenNote} />
                                            <textarea className="myInput" name="edescription" id="edescription" rows="5"
                                                placeholder="Your Description..." value={updateNoteState.edescription} onChange={setUpdatenNote}></textarea>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <Button ref={refClose} variant="contained" className='buttonCancel' data-dismiss="modal">Cancel</Button>
                                        <Button disabled={updateNoteState.etitle === "" || updateNoteState.edescription === ""} variant="contained" className='buttonUpdate' color="primary" onClick={sendUpdate}>Update</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="notes">
                            <h4>Your Notes</h4>
                            {
                                notes.map((note) => {
                                    return <Noteitem key={note._id} note={note} updateNoteFun={updateNoteFun} handleFav={handleFav} />
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-3">
                        <Profile userDetail={userDetail} />
                    </div>
                    <div className="a"></div>
                </div>
            </div>
            <Editprofile />
        </>
    )
}

export default Notes
