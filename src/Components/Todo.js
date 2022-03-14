import { useState } from "react";

const Todo = () => {
  //Todo ke andar null array banarahe hai jisme first para variable hai aur doosra para function hota
  const [arr, setArr] = useState([]);
  const [task, setTask] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [updateIndex, setIndex] = useState(null);

  //Function banaya to do add task
  const AddTodo = () => {
    if (!task?.length) {
      return console.log("Please Add Task First!");
    }

    arr.push(task); //To insert value in array
    setArr([...arr]); //Apne array ko setarry mein pass kardia with ...copy
    setTask(""); //Uski value null kardi takay user doosri value daal sakay aur clear kar sakay
  };

  //Function to delete task
  const deleteTodo = (index) => {
    //isse index milegi jo hum apne button mein pass karenge
    //console.log("index", arr.filter(index, 1));
    //console.log("arr", arr);
    arr.splice(index, 1); //splice se hum ko bhi task remove kar sakte bagair doosra task ko remove kiye
    setArr([...arr]);
    cancelUpdate(); //koi update ka function chal raha tha usse canel kardo
  };

  //Function to edit task
  const editTodo = (index) => {
    setTask(arr[index]);
    setEdit(true); //jab ye true hoga tabhi button ayege
    setIndex(index);
  };

  const cancelUpdate = () => {
    setTask("");
    setEdit(false);
  };

  const updateTask = () => {
    arr[updateIndex] = task;
    setTask("");
    setEdit(false);
    setIndex(null);
    setArr([...arr]);
  };

  //Kisi bhi component mein return banate
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          name="task"
          placeholder="Add Todo"
          onChange={(e) => setTask(e?.target?.value)} //setTask is completed to get value
          value={task} //Humne setTask ko clear bhi karana so value=task
        />
        {!isEdit ? ( //Cancel update ko call kiya cancel ke button mein
          <button onClick={AddTodo}>Add Task</button>
        ) : (
          <span>
            <button onClick={updateTask}>Update</button>
            <button onClick={cancelUpdate}>Cancel</button>
          </span>
        )}
      </div>

      <ol>
        {arr?.map((v, i) => {
          //aik hi line mein rakhna so span use kiya, &nbsp se space ajayega after delete, aur index pass karne ke liye arrow function bhi lagaya in delete button
          return (
            <li key={i}>
              <span>{v}</span>
              &nbsp;
              <button onClick={() => editTodo(i)}>Edit</button>
              &nbsp;
              <button onClick={() => deleteTodo(i)}>Delete</button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default Todo;
