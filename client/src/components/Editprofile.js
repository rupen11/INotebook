import React, { useContext, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import noteContext from '../context/notes/noteContext';

const closeSlide = () => document.getElementsByClassName("edit_overly")[0].classList.remove("active_edit");


const Editprofile = () => {
    const context = useContext(noteContext);
    const { sendEdit } = context;

    const [editProfile, setEditProfile] = useState({ username: "", email: "", password: "" });
    const onChange = (e) => {
        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    }

    const handleUpdate = () => {
        sendEdit(editProfile.username, editProfile.email, editProfile.password);
        closeSlide();
    }

    return (
        <div className="edit_overly">
            <div className="edit_innerbox">
                <div className="edit_header">
                    <CloseIcon className="closebtn" onClick={closeSlide} />
                    <p className="edit_heading">Edit Profile</p>
                </div>
                <form className="myeditprofileform">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={editProfile.username} onChange={onChange} className="myEditProfileInput" />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={editProfile.email} onChange={onChange} className="myEditProfileInput" />

                    <label htmlFor="password">Password</label>
                    <input type="test1" name="password" value={editProfile.password} onChange={onChange} className="myEditProfileInput" />

                    <Button variant="contained" className="btn_edit_save" onClick={handleUpdate}>Save</Button>
                </form>
            </div>
        </div>
    )
}

export default Editprofile
