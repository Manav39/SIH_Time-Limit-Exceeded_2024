import React from 'react'
import { FaHome, FaImage } from 'react-icons/fa'
import { IoCalendar } from 'react-icons/io5'
import { RiSuitcaseFill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  const { t } = useTranslation()

  const isActive = (path) => {
    return location.pathname === path ? 'navactive' : ''
  }

  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive('/dashboard/deptcoord/depdash')}`}
            to="/dashboard/deptcoord/depdash"
          >
            <FaHome />
            <span className="ms-1">{t('adminSidebar.admin')}</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive('/dashboard/report')}`}
            to="/dashboard/report"
          >
            <FaImage />
            <span className="ms-1">{t('adminSidebar.report')}</span>
          </Link>
        </li>
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive('/dashboard/events')}`}
            to={'/dashboard/events'}
          >
            <IoCalendar />
            <span className="ms-1">{t('adminSidebar.events')}</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive('/dashboard/adminpublications')}`}
            to={'/dashboard/adminpublications'}
          >
            <RiSuitcaseFill />
            <span className="ms-1">{t('adminSidebar.publications')}</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive('/dashboard/departments')}`}
            to={'/dashboard/departments'}
          >
            <RiSuitcaseFill />
            <span className="ms-1">{t('adminSidebar.departments')}</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive('/dashboard/users')}`}
            to={'/dashboard/users'}
          >
            <RiSuitcaseFill />
            <span className="ms-1">{t('adminSidebar.users')}</span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default SidebarAdmin

{
  /* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/courses")}`}
            to={"/dashboard/courses"}
          >
            <ImBooks />
            <span className="ms-1">Courses</span>
          </Link>
        </li> */
}

{
  /* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/alumnilist")}`}
            to={"/dashboard/alumnilist"}
          >
            <FaUserGraduate />
            <span className="ms-1">Alumni List</span>
          </Link>
        </li> */
}
{
  /* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/jobs")}`}
            to={"/dashboard/jobs"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Jobs</span>
          </Link>
        </li> */
}
{
  /* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/donations")}`}
            to={"/dashboard/donations"}
          >
            <RiMoneyDollarBoxFill />
            <span className="ms-1">Donations</span>
          </Link>
        </li> */
}
{
  /* <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/forum")}`}
            to={"/dashboard/forum"}
          >
            <MdForum />
            <span className="ms-1">Forum</span>
          </Link>
        </li> */
}
