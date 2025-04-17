import './_App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ProjectState from './context/project/ProjectState';
import Task from './pages/tabs/project/Project';
import Tasks from "./pages/tabs/projects/Projects";
import DetailEmployee from './pages/tabs/detailEmployee/DetailEmployee';
import Employee from './pages/tabs/employee/Employee';
import Attendance from './pages/tabs/attendance/Attendance';
import Dashboard from './pages/tabs/dashboard/Dashboard';

function App() {
  return (
    <>
    <ProjectState>
    
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/task" element={<Task />} />
              <Route exact path="/tasks" element={<Tasks />} />
              <Route exact path="/employees" element={<Employee />} />
              <Route exact path="/attendances" element={<Attendance />} />
              <Route exact path="/detailedEmployeePage" element={<DetailEmployee />} />
            </Routes>
          </BrowserRouter>
          
    </ProjectState>
    </>
  );
}

export default App;


