import "./App.css"
import React,{ useState } from "react"

function App(){
    
    const [newTask,setNewtask]= useState("");
    const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem("to_do_items1")) || []);
   
    function handleAddTask(){
        if(newTask !== ''){const newlistitems=[...tasks,{task:newTask}]
        setTasks(newlistitems)
        setNewtask("")
        localStorage.setItem("to_do_items1",JSON.stringify(newlistitems))}
    }

    function handleTasks(event){
        setNewtask(event.target.value);
    }

    function removeTasks(index){
        const newlistitems=tasks.filter((_,i)=>i!=index)
        setTasks(newlistitems)
        localStorage.setItem("to_do_items1",JSON.stringify(newlistitems))
    }

    function moveUp(index){
        if(index>0){
            const updateTasks=[...tasks];
            [updateTasks[index],updateTasks[index - 1]]=[updateTasks[index - 1],updateTasks[index]];
            setTasks(updateTasks)
            localStorage.setItem("to_do_items1",JSON.stringify(updateTasks))

        }
    }
    
    function moveDown(index){
        if(index<tasks.length-1){
            const updateTasks=[...tasks];
            [updateTasks[index],updateTasks[index + 1]]=[updateTasks[index + 1],updateTasks[index]];
            setTasks(updateTasks)
            localStorage.setItem("to_do_items1",JSON.stringify(updateTasks))
            
        }
    }

    return(
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div className="get-task">
                <input type="text" 
                       value={newTask} 
                       placeholder="Enter a task..." 
                       onChange={handleTasks}/>

                <button className="add-button" onClick={handleAddTask}>Add task</button>
            </div>
            <ol>
                
                {tasks.map((task,index)=><li key={index}>
                    <span>{task.task}</span>
                    <button className="delete-button" onClick={()=>removeTasks(index)}>Delete</button>
                    <button className="move-button" onClick={()=>moveUp(index)}>⬆️</button>
                    <button className="move-button" onClick={()=>moveDown(index)}>⬇️</button>
                    </li>)}
            </ol>

        </div>
    )
}
export default App