import React, { useEffect, useState } from 'react'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import noFavImage from '../img/favourite-icon.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Favourite = (props) => {

    const [notes, setNotes] = useState([]);
    const getNotes = () => {
        let getFavNotes = localStorage.getItem("Fav-Notes");
        if (getFavNotes !== null) {
            const noteObj = JSON.parse(getFavNotes);
            console.log(noteObj);
            setNotes(noteObj);
        }
        else {
            console.log("no");
        }
    }

    const removeFav = (id) => {
        let getFavNotes = localStorage.getItem("Fav-Notes");
        if (getFavNotes !== null) {
            const noteObj = JSON.parse(getFavNotes);
            const newNoteObj = noteObj.filter(element => element._id !== id)
            localStorage.setItem("Fav-Notes", JSON.stringify(newNoteObj));
            getNotes();
            props.showAlert("Note removed from favourite list", "success");
        }
        else {
            props.showAlert("Some problem to remove note from favourite list", "danger");
        }
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className="notes" >
            {
                notes.length === 0 &&
                <div className="notfound">
                    <img src={noFavImage} alt="no favourite notes" />
                    <h4 className='text-center'>No any Favorite Note</h4>
                    <Button variant="contained" className='buttonHome' color="primary" ><Link to="/notes">Notes</Link></Button>
                </div>
            }
            {
                notes.map(note => {
                    return (
                        <div className="container note" key={note._id}>
                            <h6>{note.title}</h6>
                            <h6>{note.tag} < LabelOutlinedIcon /></h6>
                            <p>{note.description}</p>
                            <button type='button' className='removeFav' onClick={() => { removeFav(note._id) }}>Remove</button>
                        </div >
                    )
                })
            }
        </div >
    )
}

export default Favourite
