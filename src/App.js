import React, {useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import { useStateValue } from "./StateProvider";
function App() {

  // const [user, setUser] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">

      { !user ? (
        <SignUp />
      )
      : (
        <div className="app__body">
      

        <Router>
          <Sidebar/>
          {/* <Routes>
            <Route path="/" element={<Sidebar />} />
          </Routes> */}
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
          {/* <Routes>
            <Route index element={<Sidebar />} />
          </Routes> */}
        </Router>
      </div>
      )
      }
       </div>
      
  );
}

export default App;
