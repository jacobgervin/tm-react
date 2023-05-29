import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from "./taskcontainers/todo";
import Doing from "./taskcontainers/doing";
import Done from "./taskcontainers/done";

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log('Retrieved tasks:', storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Stored tasks:', tasks);
  }, [tasks]);

  const addTask = () => {
    if (taskName.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskName,
      status: 'TODO',
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <h1>TASK MANAGER</h1>
      <div className='addtask'>        
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
                <button onClick={addTask}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" width={30} stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
        </div>
      <div className='taskcontainer'>
        <div>
          <Todo tasks={tasks} removeTask={removeTask} moveTask={moveTask}/>
        </div>
        <div>
          <Doing tasks={tasks} removeTask={removeTask} moveTask={moveTask} />
        </div>
        <div>
          <Done tasks={tasks} removeTask={removeTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
