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

const SidebarDeptCoord = ({ isOpen, toggleSidebar }) => {
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
            <span className="ms-1">Dashboard</span>
          </Link>
        </li>
        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/events")}`}
            to="/dashboard/events"
          >
            <FaImage />
            <span className="ms-1">Events</span>
          </Link>
        </li> */}
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/deptcoord/faculties")}`}
            to={"/dashboard/deptcoord/faculties"}
          >
            <FaUserGraduate />
            <span className="ms-1">Faculty List</span>
          </Link>
        </li>

        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive(
              "/dashboard/deptcoord/pendingrequests"
            )}`}
            to={"/dashboard/deptcoord/pendingrequests"}
          >
            <ImBooks />
            <span className="ms-1">Pending Request</span>
          </Link>
        </li> */}
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive(
              "/dashboard/deptcoord/publications"
            )}`}
            to={"/dashboard/deptcoord/publications"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Publications</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive(
              "/dashboard/deptcoord/achievements"
            )}`}
            to={"/dashboard/deptcoord/achievements"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Achievements</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive(
              "/dashboard/deptcoord/departmentdetails"
            )}`}
            to={"/dashboard/deptcoord/departmentdetails"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Department</span>
          </Link>
        </li>

        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive(
              "/dashboard/deptcoord/departmentevents"
            )}`}
            to={"/dashboard/deptcoord/departmentevents"}
          >
            <IoCalendar />
            <span className="ms-1">Events</span>
          </Link>
        </li>

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

        {/* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/users")}`}
            to={"/dashboard/users"}
          >
            <FaUsers />
            <span className="ms-1">Users</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default SidebarDeptCoord;
