import React, { useEffect, useState } from 'react'
import api from '../services/api'
import TaskCard from '../components/TaskCard'
import Swal from 'sweetalert2'

const estados = ['Pendiente','En Progreso','Completada']

export default function Tablero(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')
  const [filter, setFilter] = useState('Todos')

  async function load(){
    setLoading(true)
    try{
      const res = await api.get('/tasks')
      setTasks(res.data)
    }catch(e){
      console.error(e)
      Swal.fire('Error','No se pudieron cargar las tareas','error')
    }finally{setLoading(false)}
  }

  useEffect(()=>{ load() }, [])

  async function handleAdd(e){
    e.preventDefault()
    if(!titulo.trim()) return Swal.fire('Validación','El título es obligatorio','warning')
    const newTask = { titulo: titulo.trim(), descripcion, fechaVencimiento, estado: 'Pendiente' }
    try{
      const res = await api.post('/tasks', newTask)
      setTasks(prev => [res.data, ...prev])
      setTitulo(''); setDescripcion(''); setFechaVencimiento('')
      Swal.fire('Listo','Tarea creada con éxito','success')
    }catch(e){
      console.error(e)
      Swal.fire('Error','No se pudo crear la tarea','error')
    }
  }

  async function handleDelete(task){
    const result = await Swal.fire({
      title: 'Eliminar tarea',
      text: `¿Eliminar "${task.titulo}"?`,
      icon: 'warning',
      showCancelButton: true
    })
    if(result.isConfirmed){
      try{
        await api.delete(`/tasks/${task.id}`)
        setTasks(prev => prev.filter(t => t.id !== task.id))
        Swal.fire('Eliminada','La tarea se eliminó correctamente','success')
      }catch(e){
        console.error(e)
        Swal.fire('Error','No se pudo eliminar la tarea','error')
      }
    }
  }

  async function handleChangeStatus(task){
    const current = task.estado
    const nextIndex = (estados.indexOf(current) + 1) % estados.length
    const updated = { ...task, estado: estados[nextIndex] }
    try{
      await api.patch(`/tasks/${task.id}`, { estado: updated.estado })
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t))
      Swal.fire('Listo','Estado actualizado','success')
    }catch(e){
      console.error(e)
      Swal.fire('Error','No fue posible actualizar el estado','error')
    }
  }

  async function handleEdit(task){
    const { value: formValues } = await Swal.fire({
      title: 'Editar tarea',
      html:
        `<input id="swal-titulo" class="swal2-input" placeholder="Título" value="${task.titulo}">` +
        `<textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción">${task.descripcion}</textarea>` +
        `<input id="swal-fecha" type="date" class="swal2-input" value="${task.fechaVencimiento}">`,
      focusConfirm: false,
      preConfirm: () => {
        const t = document.getElementById('swal-titulo').value
        const d = document.getElementById('swal-desc').value
        const f = document.getElementById('swal-fecha').value
        if(!t) Swal.showValidationMessage('El título no puede estar vacío')
        return { titulo: t, descripcion: d, fechaVencimiento: f }
      }
    })

    if(formValues){
      try{
        await api.put(`/tasks/${task.id}`, { ...task, ...formValues })
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...formValues } : t))
        Swal.fire('Listo','Cambios guardados','success')
      }catch(e){
        console.error(e)
        Swal.fire('Error','No se pudo guardar los cambios','error')
      }
    }
  }

  const visible = tasks.filter(t => filter === 'Todos' ? true : t.estado === filter)

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-2">Tablero</h2>
          <div className="mb-4 flex gap-2 items-center">
            <label>Filtrar:</label>
            <select value={filter} onChange={e=>setFilter(e.target.value)} className="border px-2 py-1 rounded">
              <option>Todos</option>
              {estados.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={load} className="ml-auto bg-gray-200 px-3 py-1 rounded">Refrescar</button>
          </div>

          {loading ? (
            <div className="p-6 bg-white rounded shadow">Cargando tareas...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visible.map(t => (
                <TaskCard key={t.id} task={t} onDelete={handleDelete} onEdit={handleEdit} onChangeStatus={handleChangeStatus} />
              ))}
            </div>
          )}
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Crear nueva tarea</h3>
          <form onSubmit={handleAdd} className="space-y-2">
            <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Título" className="w-full border px-2 py-1 rounded" />
            <textarea value={descripcion} onChange={e=>setDescripcion(e.target.value)} placeholder="Descripción" className="w-full border px-2 py-1 rounded" />
            <input value={fechaVencimiento} onChange={e=>setFechaVencimiento(e.target.value)} type="date" className="w-full border px-2 py-1 rounded" />
            <div className="text-right">
              <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Agregar</button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  )
}
