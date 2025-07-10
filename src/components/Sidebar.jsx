import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className="min-h-screen w-16 sm:w-64 bg-white shadow-lg flex flex-col border-r border-gray-200">
      {aToken && !dToken && (
        <ul className="mt-4 flex flex-col gap-1 p-0">
          <SidebarLink to="/admin-dashboard" icon={assets.home_icon} label="Dashboard" />
          <SidebarLink to="/all-appointments" icon={assets.appointment_icon} label="Appointments" />
          <SidebarLink to="/add-doctors" icon={assets.add_icon} label="Add Doctor" />
          <SidebarLink to="/doctors-list" icon={assets.people_icon} label="Doctors List" />
        </ul>
      )}

      {dToken && !aToken && (
        <ul className="mt-4 flex flex-col gap-1 p-0">
          <SidebarLink to="/doctor-dashboard" icon={assets.home_icon} label="Dashboard" />
          <SidebarLink to="/doctor-appointments" icon={assets.appointment_icon} label="Appointments" />
          <SidebarLink to="/doctor-profile" icon={assets.people_icon} label="Profile" />
        </ul>
      )}
    </div>
  )
}

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 py-3 px-2 relative text-sm font-medium justify-center sm:justify-start
      ${isActive
        ? 'bg-indigo-50 text-indigo-600 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-1 before:bg-indigo-600'
        : 'text-gray-700 hover:bg-gray-100'}`
    }
    style={{ textDecoration: 'none' }}
  >
    <img src={icon} alt={label} className="w-5 h-5" />
    <span className="hidden sm:inline">{label}</span>
  </NavLink>
)

export default Sidebar
