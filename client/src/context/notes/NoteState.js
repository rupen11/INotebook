import { useState } from 'react';
import NoteContext from './noteContext'

const NoteState = (props) => {
    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);
    const getToken = localStorage.getItem('token');

    const [state, setState] = useState({});

    const getData = async () => {
        try {
            const res = await fetch("/api/auth/getuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
        catch (err) {
            console.log("Some error to get user data " + err);
        }
    }

    const sendEdit = async (username, email, password) => {
        try {
            const res = await fetch(`/api/auth/updateuser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ username, email, password })
            });
            const json = await res.json();
            if (res.status === 200) {
                props.showAlert(json.solve, "success");
                setState(json.findUser);
            }
            if (res.status === 404) {
                props.showAlert(json.solve, "warning");
            }
        } catch (error) {
            console.log("Some error to edit profile " + error);
        }
    }

    const getAllNotes = async () => {
        try {
            const res = await fetch(`/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getToken
                }
            });
            const allnotes = await res.json();
            setNotes(allnotes);
        }
        catch (err) {
            console.log("Some error to get all notes " + err);
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            const res = await fetch(`/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getToken
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await res.json();
            if (res.status === 200 && json.success) {
                // props.showAlert(json.solve, "success");
                // Client side added
                setNotes(notes.concat(json.saveNotes));
            }
            else {
                props.showAlert(json.error, "danger");
            }
        }
        catch (err) {
            console.log("Some error to add a note " + err);
        }
    }

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const res = await fetch(`/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getToken
                }
            });
            const json = await res.json();
            if (res.status === 200 || json.success) {
                // Delete Client side
                const newNotes = notes.filter((note) => { return note._id !== id });
                setNotes(newNotes);
                props.showAlert(json.solve, "success");
            }
            else {
                console.log("Some error to delete a note please check");
                props.showAlert(json.error, "danger");
            }
        }
        catch (err) {
            console.log("Some error to delete a note " + err);
        }
    }

    // Update a note
    const updateNote = async (id, title, description, tag) => {
        try {
            const res = await fetch(`/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getToken
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await res.json();
            if (res.status === 200 || json.success) {
                // Update note on client side
                let newNotes = JSON.parse(JSON.stringify(notes));

                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if (element._id === id) {
                        newNotes[index].title = title;
                        newNotes[index].tag = tag;
                        newNotes[index].description = description;
                        break;
                    }
                }
                setNotes(newNotes);
                props.showAlert(json.solve, "success");
            }
            else {
                props.showAlert(json.error, "danger");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getAllNotes, updateNote, getData, sendEdit, state }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
