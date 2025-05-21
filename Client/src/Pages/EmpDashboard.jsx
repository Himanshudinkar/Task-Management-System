import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "../css/AdminDashboard.css";

const EmpDashboard = () =>{

    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
      setOpenSidebar(!openSidebar);
    };


    return(
        <>

        <div className="dashboard">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰ Menu
        </button>

        <div className={`sidebar ${openSidebar ? "open" : ""}`}>
          <h2>Employee Panel</h2>
          <nav>
            <Link to="displaytask" onClick={toggleSidebar}>Display Task</Link>
            <Link to="changepassword" onClick={toggleSidebar}>Change Password</Link>
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

export default EmpDashboard