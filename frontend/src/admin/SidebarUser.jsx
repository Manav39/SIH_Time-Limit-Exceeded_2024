import React from "react";
import { FaHome, FaTrophy, FaChalkboardTeacher, FaUsers, FaComments } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "navactive" : "";
  };

  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link className={`nav-link ${isActive("/dashboard")}`} to="/dashboard">
            <FaHome />
            <span className="ms-1">Home</span>
          </Link>
        </li> */}
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/publications")}`}
            to="/dashboard/publications"
          >
            <ImBooks />
            <span className="ms-1">Academics</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/achievements")}`}
            to="/dashboard/achievements"
          >
            <FaTrophy />
            <span className="ms-1">Extra-curricular</span>
          </Link>
        </li>
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/forum")}`}
            to="/dashboard/forum"
          >
            <FaComments />
            <span className="ms-1">Forum</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
