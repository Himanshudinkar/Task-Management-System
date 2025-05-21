import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <div className="dashboard">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰ Menu
        </button>

        <div className={`sidebar ${openSidebar ? "open" : ""}`}>
          <h2>Admin Panel</h2>
          <nav>
            <Link to="createemp" onClick={toggleSidebar}>Add Employee</Link>
            <Link to="assigntask" onClick={toggleSidebar}>Assign Task</Link>
            <Link to="tasktracker" onClick={toggleSidebar}>Task Tracker</Link>
            <Link to="viewtask" onClick={toggleSidebar}>View Task Status</Link>
            <Link to="managetask" onClick={toggleSidebar}>Manage Tasks</Link>
            <Link to="/" onClick={toggleSidebar}>Logout</Link>
          </nav>
        </div>

        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminDashboard;
