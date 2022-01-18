import React, { useContext, useState } from 'react'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import noteContext from '../context/notes/noteContext';
import Button from '@material-ui/core/Button';



// js
const title = () => {
    document.getElementById("allthing").style.display = 'block';
}

const Addnote = () => {
    // usecontext to get add note function
    const context = useContext(noteContext);
    const { addNote } = context;

    // state on new note
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "" });

    // set new note to state
    const setAddNote = (e) => setNewNote({ ...newNote, [e.target.name]: e.target.value });

    // submit new note
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag);
        setNewNote({ title: "", description: "", tag: "" });
    }

    return (
        <div className="addNotes">
            <form action="" method="post" id="myForm">
                <input className="myInput" type="text" name="title" id="title" placeholder="Title" value={newNote.title} onFocus={title} onChange={setAddNote} />
                <div id="allthing" style={{ display: " none" }}>
                    <input className="myInput" type="tag" name="tag" id="tag" placeholder="Tag" value={newNote.tag} onChange={setAddNote} />
                    <textarea className="myInput" name="description" id="description" rows="5"
                        placeholder="Your Description..." value={newNote.description} onChange={setAddNote}></textarea>
                </div>
                <Button variant="contained" disabled={newNote.title === "" || newNote.description === ""} type="submit" className="buttonAdd" color="primary" onClick={handleAdd}>Add</Button>
            </form>
            <div className="icons">
                <FileCopyOutlinedIcon className='pro-icons' />
                <PhotoLibraryOutlinedIcon className='pro-icons' />
                <ColorLensOutlinedIcon className='pro-icons' style={{ color: "red" }} />
                <ColorLensOutlinedIcon className='pro-icons' style={{ color: "blue" }} />
                <ColorLensOutlinedIcon className='pro-icons' style={{ color: "orange" }} />
                <ColorLensOutlinedIcon className='pro-icons' />
            </div>
        </div>
    )
}

export default Addnote
