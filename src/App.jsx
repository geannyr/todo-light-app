
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [taskType, setTaskType] = useState("Pessoal");
  const [taskStatus, setTaskStatus] = useState("Pendente");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const validate = () => {
    const newErrors = {};
    if (!newTask.trim()) newErrors.newTask = "Digite a tarefa.";
    if (!taskDate.trim()) newErrors.taskDate = "Escolha a data.";
    return newErrors;
  };

  const handleAddTask = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const task = { text: newTask, type: taskType, status: taskStatus, date: taskDate };
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setNewTask("");
    setTaskType("Pessoal");
    setTaskStatus("Pendente");
    setTaskDate("");
    setErrors({});
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].text);
    setTaskType(tasks[index].type);
    setTaskStatus(tasks[index].status);
    setTaskDate(tasks[index].date);
    setErrors({});
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900`}>
      <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ToDo Light</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-xl text-gray-800 dark:text-white transition-transform duration-200 hover:scale-110"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          <div className="flex flex-col">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Digite sua tarefa"
              className={`px-4 py-2 rounded-xl border ${errors.newTask ? "border-yellow-500" : "border-gray-300"} dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white`}
            />
            {errors.newTask && <small className="text-yellow-500 mt-1">{errors.newTask}</small>}
          </div>
          <div className="flex flex-col">
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className={`px-3 py-2 rounded-xl border ${errors.taskDate ? "border-yellow-500" : "border-gray-300"} dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white`}
            />
            {errors.taskDate && <small className="text-yellow-500 mt-1">{errors.taskDate}</small>}
          </div>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
          >
            <option>Pessoal</option>
            <option>Trabalho</option>
            <option>Estudo</option>
          </select>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
          >
            <option>Pendente</option>
            <option>Concluída</option>
            <option>Atrasada</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {editIndex !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl transition-all"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{task.text}</p>
                <small className="text-sm text-gray-600 dark:text-gray-300">
                  {task.type} - {task.status} - {task.date}
                </small>
              </div>
              <div className="flex gap-2 text-lg text-gray-700 dark:text-white">
                <button onClick={() => handleEdit(index)} className="hover:text-yellow-500">
                  <FiEdit2 />
                </button>
                <button onClick={() => handleDelete(index)} className="hover:text-red-500">
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
