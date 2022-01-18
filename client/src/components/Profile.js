import React from 'react'
import Button from '@material-ui/core/Button';

const Profile = (props) => {
    const editProfile = () => document.getElementsByClassName("edit_overly")[0].classList.add("active_edit");
    const { username, email, date } = props.userDetail;

    return (
        <div className="userdetail">
            <h4>Profile</h4>
            <div className="profile">
                <table className="table table-hover text-center">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td>{username}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td>***************</td>
                        </tr>
                        <tr>
                            <th>Register on</th>
                            <td>{date}</td>
                        </tr>
                        <tr>
                            <th>Total Notes</th>
                            <td>12</td>
                        </tr>
                    </tbody>
                </table>
                <Button variant="contained" color="primary" type="button" className="btnedit" onClick={editProfile}>edit profile</Button>
                <ul className="profile-list">
                    <li>Your Favourite Notes</li>
                    <li>Logout</li>
                    <li>Feedback</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
