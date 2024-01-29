
import './_App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ProjectState from './context/project/ProjectState';
import Home from './pages/home/Home';
import Project from './pages/tabs/project/Project';
import Projects from "./pages/tabs/projects/Projects";

function App() {
  return (
    <>
    <ProjectState>
    
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/dashboard" element={<Home />} />
              <Route exact path="/project" element={<Project />} />
              <Route exact path="/projects" element={<Projects />} />
            </Routes>
          </BrowserRouter>
          
    </ProjectState>
    </>
  );
}

export default App;

