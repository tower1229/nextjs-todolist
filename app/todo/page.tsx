'use client'

import { useState, useEffect } from "react"
import { Trash, PencilSimple, Check, X } from "@phosphor-icons/react"
import { Todo, getTodos, addTodo, updateTodo, deleteTodo } from "./actions"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation';
export default async function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const session = await getServerSession()

  if (!session) {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    const loadTodos = async () => {
      const loadedTodos = await getTodos()
      setTodos(loadedTodos)
    }
    loadTodos()
  }, [])

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      await addTodo(newTodo)
      setNewTodo("")
      const updatedTodos = await getTodos()
      setTodos(updatedTodos)
    }
  }

  const handleToggleTodo = async (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id)
    if (todoToToggle) {
      await updateTodo(id, { completed: !todoToToggle.completed })
      const updatedTodos = await getTodos()
      setTodos(updatedTodos)
    }
  }

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id)
    const updatedTodos = await getTodos()
    setTodos(updatedTodos)
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const handleSaveEdit = async (id: number) => {
    await updateTodo(id, { text: editText })
    const updatedTodos = await getTodos()
    setTodos(updatedTodos)
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  return (
    <div className="bg-gradient-to-r flex min-h-screen from-cyan-500 to-blue-500 px-4 items-center justify-center">
      <div className="bg-white rounded-lg max-w-md shadow-xl w-full overflow-hidden">
        <div className="py-8 px-6">
          <h1 className="font-bold text-center mb-6 text-3xl text-gray-800">在线 TodoList</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder="添加新任务..."
              className="rounded-l-lg bg-gray-100 flex-1 py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="New todo text"
            />
            <button
              onClick={handleAddTodo}
              className="rounded-r-lg bg-blue-500 text-white py-2 px-4 transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Add todo"
            >
              添加
            </button>
          </div>
          <ul className="space-y-2" role="list">
            {todos.map(todo => (
              <li key={todo.id} className="rounded-lg flex bg-gray-50 shadow p-3 transition-all duration-300 items-center hover:shadow-md">
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-white border rounded flex-1 mr-2 py-1 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Edit todo text"
                    />
                    <button
                      onClick={() => handleSaveEdit(todo.id)}
                      className="mr-2 transition-colors text-green-500 duration-300 hover:text-green-700 focus:outline-none"
                      aria-label="Save edit"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="transition-colors text-red-500 duration-300 hover:text-red-700 focus:outline-none"
                      aria-label="Cancel edit"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="rounded cursor-pointer h-5 mr-3 text-blue-500 w-5 form-checkbox focus:ring-blue-500"
                      aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                    />
                    <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="mr-2 transition-colors text-blue-500 duration-300 hover:text-blue-700 focus:outline-none"
                      aria-label={`Edit "${todo.text}"`}
                    >
                      <PencilSimple className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="transition-colors text-red-500 duration-300 hover:text-red-700 focus:outline-none"
                      aria-label={`Delete "${todo.text}"`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}