import React from 'react'
import ErrorImage from '../img/error-404.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='errorContainer'>
            <img src={ErrorImage} alt="404 not found" />
            <h4>404 Not Found</h4>
            <p>The page are you looking for is not available or under constuction</p>
            <Button variant="contained" className='buttonHome' color="primary"><Link to="/">Home</Link></Button>
        </div>
    )
}

export default Error
