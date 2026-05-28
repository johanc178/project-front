import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [nombre, setNombre] = useState('')
  const [departamento, setDepartamento] = useState('Desarrollo')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    if(!nombre.trim()) return alert('El nombre es obligatorio')
    const session = { nombre: nombre.trim(), departamento }
    localStorage.setItem('sessionUser', JSON.stringify(session))
    navigate('/tablero')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Nombre de Usuario</label>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Departamento</label>
          <select value={departamento} onChange={e=>setDepartamento(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option>Desarrollo</option>
            <option>Diseño</option>
            <option>Marketing</option>
            <option>Soporte</option>
          </select>
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
        </div>
      </form>
    </div>
  )
}
