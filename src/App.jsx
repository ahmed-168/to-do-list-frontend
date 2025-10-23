import './App.css'
import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8">
        <Navbar />
        <TaskList />
      </div>
    </>
  )
}

export default App
