import React from 'react'

export default function TaskCard({ task, onEdit, onDelete, onChangeStatus }){
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold">{task.titulo}</h3>
      <p className="text-sm text-gray-600">{task.descripcion}</p>
      <div className="text-xs text-gray-500 mt-2">Vence: {task.fechaVencimiento}</div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm">Estado: <span className="font-medium">{task.estado}</span></div>
        <div className="flex gap-2">
          <button onClick={() => onChangeStatus(task)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Cambiar</button>
          <button onClick={() => onEdit(task)} className="px-2 py-1 bg-yellow-400 text-white rounded text-sm">Editar</button>
          <button onClick={() => onDelete(task)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Eliminar</button>
        </div>
      </div>
    </div>
  )
}
