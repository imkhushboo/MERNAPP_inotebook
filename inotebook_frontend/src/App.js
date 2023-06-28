import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Note from "./component/Note";
import About from "./component/About";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Modalstate from "./context/modal/modalstate";

function App() {
  return (
    <>
      <Modalstate>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/notes" element={<Note />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </BrowserRouter>
        </NoteState>
      </Modalstate>
    </>
  );
}

export default App;
