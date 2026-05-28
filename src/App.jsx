import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Tablero from './pages/Tablero'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  const navigate = useNavigate()
  const session = JSON.parse(localStorage.getItem('sessionUser') || 'null')

  function handleLogout(){
    localStorage.removeItem('sessionUser')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/tablero" className="font-bold text-lg">Gestor de Tareas</Link>
          <div>
            {session ? (
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <div>{session.nombre}</div>
                  <div className="text-gray-500">{session.departamento}</div>
                </div>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Cerrar sesión</button>
              </div>
            ) : (
              <Link to="/login" className="text-blue-600">Iniciar sesión</Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/tablero" element={<ProtectedRoute><Tablero/></ProtectedRoute>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
}
