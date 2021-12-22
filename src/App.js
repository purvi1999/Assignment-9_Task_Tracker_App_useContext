import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import Header from "./component/Header.js";
import Tasks from "./component/Tasks.js";
import Add_task from "./component/Add_task.js";
import Footer from "./component/Footer.js";
import About from "./component/About.js";
import { GlobalProvider } from "./context/GlobalState.js";
function App() {
  const [showTask, setShowTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Reading Book",
      day: "meeting 10th at 10:00am",
      reminder: true
    },
    {
      id: 2,
      text: "Go to Birthday Party",
      day: "Feb 5th at 2:30pm",
      reminder: true
    },
    {
      id: 3,
      text: "Eating Food",
      day: "10th at 2:00pm",
      reminder: false
    }
  ]);

  //Add task -
  const add_task = async (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    console.log(task);
  };

  //delete task -
  const delete_task = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    });

    await setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggle = async (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    //<div className="container" style={{color:'red'}}>
    <GlobalProvider>
      <Router>
        <div className="container">
          <Header onAdd={() => setShowTask(!showTask)} showAddTask={showTask} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showTask && <Add_task add_task={add_task} />}

                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={delete_task}
                      onToggle={toggle}
                    />
                  ) : (
                    <p>No Task Avaiable</p>
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
