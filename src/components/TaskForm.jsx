import axios from 'axios';
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import Alert from './Alert';

const TaskForm = () => {

    const [taskText, setTaskText] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState("");
    const [alert, setAlert] = useState({type:"", message: ""});

    const handleCreateTaskFormAPI = async () => {
        if (!taskText || !dueDate || !priority) {
                setAlert({type: "error", message:"⚠ Please fill in all details"})
                return;
            }
        try {
            await axios.post("http://localhost:8085/toDoList", {
                "taskName": taskText,
                "dueDate": dueDate,
                "priority": priority.toUpperCase()
            })

            setAlert({type: "success", message:"✅ Task created successfully"});
            setTaskText("");
            setDueDate(null);
            setPriority("");

        } catch (err) {
            setAlert({ type: "error", message: "❌ Failed to create task." });
            console.log(err);
        }
    };

    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Task Form</legend>

                {/* 🔹 Reusable Alert Component */}
        <Alert type={alert.type} message={alert.message} />

                <label className="label">Task Input</label>
                <input type="text" value={taskText} className="input" placeholder="write your task here" onChange={(e) => setTaskText(e.target.value)}>

                </input>

                <label className="label">Due Date</label>
                <button popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" }}>
                    {dueDate ? dueDate.toLocaleDateString() : "Pick a date"}
                </button>
                <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
                    <DayPicker className="react-day-picker" mode="single" selected={dueDate} onSelect={setDueDate} />
                </div>

                <label className="label">Priority</label>
                <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
                    {priority ? priority : "select task priority"}
                </button>

                <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
                    <li onClick={() => setPriority("Low")}><a>Low</a></li>
                    <li onClick={() => setPriority("Medium")}><a>Medium</a></li>
                    <li onClick={() => setPriority("High")}><a>High</a></li>
                </ul>

                <input type="submit" value="Submit" className="btn" onClick={handleCreateTaskFormAPI} />

            </fieldset>
        </div>
    )
}

export default TaskForm