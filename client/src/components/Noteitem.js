import React, { useContext } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import noteContext from '../context/notes/noteContext';

const Note = (props) => {
    const { title, description, tag, _id } = props.note;
    const { updateNoteFun, handleFav } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        < div className="note" >
            <h6>{title}</h6>
            <h6>{tag !== "" && < LabelOutlinedIcon />} {tag}</h6>
            <p>{description}</p>
            <div className="noteincons">
                <EditOutlinedIcon className='pro-icons' style={{ color: "gray" }} onClick={() => { updateNoteFun(props.note) }} />
                <FavoriteOutlinedIcon className='pro-icons' style={{ color: "gray" }} onClick={() => handleFav(props.note)} />
                <DeleteOutlinedIcon className='pro-icons' style={{ color: "gray" }} onClick={() => { deleteNote(_id) }} />
            </div>
        </div >
    )
}

export default Note
