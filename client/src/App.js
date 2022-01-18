import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './components/About';
import Notes from './components/Notes';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Favourite from './components/Favourite';
import Error from './components/Error';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  }

  return (
    <NoteState showAlert={showAlert} >
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/about">
            <About showAlert={showAlert} />
          </Route>
          <Route exact path="/notes">
            <Notes showAlert={showAlert} />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert} />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert} />
          </Route>
          <Route exact path="/favourite">
            <Favourite showAlert={showAlert} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Router>
    </NoteState>
  );
}

export default App;
