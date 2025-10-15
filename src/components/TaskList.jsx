import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import { Pencil, Trash } from 'lucide-react';
import axios from 'axios'
import Alert from './Alert'

const TaskList = () => {

  const [alert, setAlert] = useState({type:"", value:""});
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8085/toDoList");
        console.log("tasks fetched:", response.data)
        setTaskList(response.data);
      } catch(err) {
        // setAlert({type : "error", message : "Error while fetching data"});
        console.log("Error while fetching data"+err);
      }
    }

    fetchTasks();
  }, [])

  // delete api
  const handleDeleteTask = async (id) => {
    try {
          await axios.delete(`http://localhost:8085/toDoList/${id}`);
          setTaskList(taskList.filter((task) => task.id !== id));
    } catch (err){
      console.log("Error while deleting data", err);
    }
  }

  return (
    <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 top-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Task Story</th>
        <th>Due Date</th>
        <th>Priority</th>
        <th>Status</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {taskList.length > 0 ? 
      (
        taskList.map((task) => (
      <tr key={task.id}>
        <td>{task.taskName}</td>
        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
        <td>{task.priority}</td>
        <td>{task.status}</td>
        <td>{new Date(task.createdAt).toLocaleString()}</td>
        <td>
          {/* edit button */}
          <button className="btn btn-circle">
  <Pencil/>
  </button>
  {/* delete button */}
<button className="btn btn-circle hover:bg-red-600" onClick={() => handleDeleteTask(task.id)}>
  <Trash/>
</button>
        </td>
      </tr> ))
      ): 
      (
        <tr>
          <td colSpan="5" className="text-center text-gray-500">
            No tasks found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default TaskList