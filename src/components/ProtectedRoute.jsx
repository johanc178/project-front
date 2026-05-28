import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }){
  const session = JSON.parse(localStorage.getItem('sessionUser') || 'null')
  if(!session) return <Navigate to="/login" replace />
  return children
}
