import { useNavigate } from "react-router-dom"
import "./AdminNavBar.css"

import React from 'react'

export default function AdminNavBar() {
  const navigate=useNavigate()
  const adminLogout = () => {
    localStorage.removeItem("adminJWT")
    navigate("/admin/login")
}
  return (
    <div className="HomeNav"><nav class="navbar navbar-expand-lg  border-bottom">
    <div class="container-fluid">
    <div className="headerContent">
      <span  class="heading navbar-brand" href="#">Universal Admin</span>
      <button onClick={adminLogout} className="logOutBtn" >LogOut</button>
      </div>
    </div>
  </nav></div>
  )
}
