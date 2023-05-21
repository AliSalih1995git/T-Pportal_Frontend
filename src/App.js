import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentPage from "./components/ParentPage";
import TeacherPage from "./components/TeacherPage";
import AddStudent from "./components/AddStudent";
import AddBatches from "./components/AddBatches";
import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SideBar>
              <TeacherPage />
              {/* <TeacherPage1 /> */}
            </SideBar>
          }
        />
        <Route path="/parent" element={<ParentPage />} />
        <Route
          path="/addStudent"
          element={
            <SideBar>
              <AddStudent />
            </SideBar>
          }
        />
        <Route
          path="/addBatches"
          element={
            <SideBar>
              <AddBatches />
            </SideBar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
