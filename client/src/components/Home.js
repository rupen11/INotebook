import React, { useState, useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';

const Home = () => {
    const context = useContext(noteContext);
    const { getData } = context;

    const [username, setUsername] = useState("");

    useEffect(async () => {
        const res = await getData();
        setUsername(res.username);
    }, [])

    return (
        <div>
            <div className="maincontainer">
                <div className="container innercontainer">
                    <h2 className='welcomeText'>Welcome {username === "" ? `${username}` : "User"}, Hope you enjoy!</h2>
                    <p className='text'>Best E-Note Book for You, called <span>INoteBook</span></p>
                    <p className='maintext'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, esse eos recusandae molestiae deleniti voluptate fuga doloribus. Ipsam aperiam nulla impedit non, quae, veniam delectus, eligendi perspiciatis itaque amet totam.</p>
                    <button className='btnStart'>Let's Started</button>
                </div>
            </div>

            <div className="featurescontainer">
                <div className="container">
                    <h2 className='featuresheading'>Features and Applications</h2>
                    <div className="box">
                        <div className="items">
                            Make it fast to add and organize tasks. Ideally, a task is added and categorized in a couple taps or keystrokes.
                        </div>
                        <div className="items">
                            Offer multiple ways to organize your tasks. Tags, lists, projects, and due dates are all helpful, and the best apps offer at least a few categories like this.
                        </div>
                        <div className="items">
                            Remind you about self-imposed deadlines. Notifications, widgets, emails—the best applications make it obvious when something needs to be completed.
                        </div>
                        <div className="items">
                            Offer clean user interfaces. Well-designed to-do apps fit into your workflow so you can get back to what you're supposed to be doing.
                        </div>
                        <div className="items">
                            Sync between every platform you use. Which platforms will depend on what you personally use, but we didn't consider anything that doesn't sync between desktop and mobile.
                        </div>
                        <div className="items">
                            Make it fast to add and organize tasks. Ideally, a task is added and categorized in a couple taps or keystrokes.
                        </div>
                        <div className="items">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, labore ab. Natus omnis molestias exercitationem quia fugiat nisi voluptates dolorem.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
