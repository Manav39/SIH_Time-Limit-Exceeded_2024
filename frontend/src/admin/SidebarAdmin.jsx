import React from "react";
import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaImage,
  FaBriefcase,
} from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { IoSettingsSharp, IoCalendar } from "react-icons/io5";
import { RiSuitcaseFill } from "react-icons/ri";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { MdForum } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "navactive" : "";
  };

  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/deptcoord/depdash")}`}
            to="/dashboard/deptcoord/depdash"
          >
            <FaHome />
            <span className="ms-1">Admin</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/report")}`}
            to="/dashboard/report"
          >
            <FaImage />
            <span className="ms-1">Report</span>
          </Link>
        </li>
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/courses")}`}
            to={"/dashboard/courses"}
          >
            <ImBooks />
            <span className="ms-1">Courses</span>
          </Link>
        </li> */}
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/events")}`}
            to={"/dashboard/events"}
          >
            <IoCalendar />
            <span className="ms-1">Events</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/adminpublications")}`}
            to={"/dashboard/adminpublications"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Publications</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/admindepartments")}`}
            to={"/dashboard/admindepartments"}
          >
            <FaUserGraduate />
            <span className="ms-1">Departments</span>
          </Link>
        </li>
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/alumnilist")}`}
            to={"/dashboard/alumnilist"}
          >
            <FaUserGraduate />
            <span className="ms-1">Alumni List</span>
          </Link>
        </li> */}
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/jobs")}`}
            to={"/dashboard/jobs"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Jobs</span>
          </Link>
        </li> */}
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/donations")}`}
            to={"/dashboard/donations"}
          >
            <RiMoneyDollarBoxFill />
            <span className="ms-1">Donations</span>
          </Link>
        </li> */} 
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/forum")}`}
            to={"/dashboard/forum"}
          >
            <MdForum />
            <span className="ms-1">Forum</span>
          </Link>
        </li> */}
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/users")}`}
            to={"/dashboard/users"}
          >
            <FaUsers />
            <span className="ms-1">Users</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
