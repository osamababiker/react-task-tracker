import { useState , useEffect} from 'react';
import Header from './Header';
import Tasks from './Tasks'
import AddTask from './AddTask';

const Home = () => {
    const [tasks , setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
          const taskFromServer = await fetsTasks();
          setTasks(taskFromServer);
        }
        getTasks();
      }, []);
  
      const fetsTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();
        return data;
      }
  
      const fetsTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        return data;
      }
  
  
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`,
      {method: 'DELETE'});
      setTasks(tasks.filter((task) => id !== task.id));
    }
  
    const toggleReminder = async (id) => {
      const taskToToggle = await fetsTask(id);
      const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};
      const res = await fetch(`http://localhost:5000/tasks/${id}`,
        {
          method: 'PUT', 
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(updatedTask)
        });
  
        const data = await res.json();
      setTasks(tasks.map((task) => task.id === id ? {
        ...task , reminder: data.reminder
      } : task));
    }

    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 1000) + 1;
        // const newTask = {id, ...task};
        
        // setTasks([...tasks , newTask]);
        const res = await fetch(
          'http://localhost:5000/tasks', {
            method: 'POST', 
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
          });
    
          const data = await res.json();
          setTasks([...tasks , data]);
      }

    return (
        <>
            <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
            {showAddTask &&<AddTask onAdd={addTask} />}
            {
              tasks.length > 0 ?
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              : 
              'No task to show'
            }
          </>
    );
}

export default Home;