import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SidebarUser from './SidebarUser'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import SidebarDeptCoord from './SidebarDeptCoord'
import SidebarAdmin from './SidebarAdmin'

const Dashboard = () => {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const r = localStorage.getItem('role')

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {r === 'user' && (
        <SidebarUser isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {r === 'department_coordinator' && (
        <SidebarDeptCoord isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {r === 'admin' && (
        <SidebarAdmin isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <main id="main" className={`main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <h1>{t('Dashboard.js.Dashboard')}</h1>
        <p>
          {t('Dashboard.js.Alumni')} | {t('Dashboard.js.Total')}
        </p>
        <p>
          {t('Dashboard.js.Forum Topics')} | {t('Dashboard.js.Total')}
        </p>
        <p>
          {t('Dashboard.js.Posted Jobs')} | {t('Dashboard.js.Now')}
        </p>
        <p>
          {t('Dashboard.js.Upcoming Events')} | {t('Dashboard.js.Total')}
        </p>
        <p>
          {t('Dashboard.js.Amount Donated')} | {t('Dashboard.js.Total')}
        </p>
        <p>
          {t('Dashboard.js.Courses')} | {t('Dashboard.js.Total')}
        </p>
        <Outlet />
      </main>
    </>
  )
}

export default Dashboard
