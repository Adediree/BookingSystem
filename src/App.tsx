import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./Login";
import { Booking } from "./BookingScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          {/* <Route path="/usergroups" element={<UserGroupList />} /> */}
          {/* <Route path="/add" element={<Form />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
