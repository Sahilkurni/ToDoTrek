// websites used : talwindcss(for importing tailwind), uuid nmp(for creating unique id install uuid),

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
// taken from react icon website
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




// folowing is used to import unique id
import { v4 as uuidv4 } from 'uuid';
uuidv4()

function App() {
  // hooks or a variable to store our todos
  var [todo, settodo] = useState("");
  // folowing is to store all the todos and above is to store current only
  var [todos, settodos] = useState([]);
  var [showfinshed,setshowfinshed] = useState(true)

  // // following function is store our data in local storage
  // const savetols = (params) => {
  //   // here all todos are stored in localstorage we call this function in other function to store that functions event or action to be saved in local storage
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }

  // useffect is to reload all the todos
  useEffect(()=>{
    // if todos array is empty then just get those all the todos
    // here storing the data to todotr
    // let todostr = localStorage.getItem("todos")
    // // and if todostr array is not empty then load the all todos or set todos
    // if(todostr){
    // let todos = JSON.parse(localStorage.getItem("todos"))
    // settodos(todos)
    // }
    let todostr = localStorage.getItem("todos");
    if (todostr) {
      settodos(JSON.parse(todostr));
    }
  }, [])

  // Save todos to localStorage whenever the todos array changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  

  // these are functions used to handel events particulary when buttons are clicked (onclick)
  const handleedit = (e,id) => {
    // here we are getting the tod0 which is same with which you wan to edit and then set that todo 
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    // folowing will delte the old one and add new on click of add button
    let newtodos = todos.filter(item => {
      return item.id != id
    })

    settodos(newtodos)
    savetols()
   };
  const handledelete = (e, id) => {
    // here we are geeting the index of that todo which id is same and then removing that todo which id is same and returning only those ids are different
    // folowing is to get the index of 
    let index = todos.findIndex(item => {
      return item.id === id
    })
    // in filter it returns based on the condition in function here it returns if item id and id is not same
    let newtodos = todos.filter(item => {
      return item.id != id
    })

    settodos(newtodos)
    savetols()

  };
  const handleadd = () => {
    // adding the task to todos usestate and iscompleted false means that task is not yet completed
    // id is uuid which create a unique id
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    settodo("")
    savetols()

  };
  // e has to pass as a parametre of a function to type in input feild
  const handlechange = (e) => {
    settodo(e.target.value)    
    savetols()


  };
  const handlecheckbox = (e) => {
    // here we are getting id oh that check box from name of check box
    let id = e.target.name
    // folowing is to get the index of 
    let index = todos.findIndex(item => {
      return item.id == id
    })
    // ...is used to change the refrence because if it is same refrence then it wont work and set the new value to todos
    let newtodos = [...todos]
    // folowing is to change the iscompleted at that partiular indexed todo of todos and ! is used for if it is true then it will become false otherwise vecaversa
    newtodos[index].iscompleted = !newtodos[index].iscompleted
    settodos(newtodos)
  };

  const togglefinshed = (e) => {
    // following will toggle from true and false
    setshowfinshed(!showfinshed)
  }
  

  return (
    <>
      <Navbar />
      {/* min-h-80vh is minimum height md is to make responsive for mobiles*/}
      <div className="mx-3 md:container md:mx-auto my-5 p-5 md:w-2/3 rounded-xl bg-sky-300 min-h-[80vh]">
      <h1 className="font-bold text-center gap-5 text-lg">ToDoTrek - Trak All Your ToDo's At One Place </h1>
        <div className="adtodo">
          <h1 className="font-bold">Add ToDo :</h1>
          {/* w for width of text feild onchange to handle changes in input field value to add the text inputed in todo */}
          <input
            type="text"
            onChange={handlechange}
            value={todo}
            className="w-full my-2 px-2 py-1 rounded-lg"
          // w-1/2 means half width of container
          />
          <button
            onClick={handleadd}
            // because of disabled the button will not perform itss action until the todo length is more than 3
            disabled={todo.length<=3}
            className="font-bold my-4 w-full gap-2 text-center disabled:bg-sky-600 bg-sky-700 hover:bg-sky-900 text-white px-3 py-0.5 rounded-lg"
          >
            ADD
          </button>
        </div>
        <input type="checkbox" onChange={togglefinshed} checked={showfinshed} name="" id="" />Show Finshed
        <h1 className="font-bold my-5">Your ToDo's</h1>
        {/* following checks if todos array is empty if empty print no todos */}
        {todos.length === 0 && <div className="m-5">No Todos To Display</div>}
        {/* folowing is to iterate and get single element from array todos and store in item and then print item */}
        {todos.map(item => {


          {/* to get the buttons and text in a single line i did flex in outer div of both text and button */ }
          // without return we are not able to print text
          // (showfinshed || !item.iscompleted) is the condition to print the todo is showfinished is checked the all todos will print other wise it will check iscompleted is false and print those todos whose iscompleted is false
          return (showfinshed || !item.iscompleted) && <div key={item.id} className="todo flex w-full justify-between my-2">
            <div className="flex gap-5">
              <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} />
              <div  className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className="buttons flex  h-full">
              <button
                // following will call that method as will as it will pass an event also and id 
                onClick={(e)=>handleedit(e,item.id)}
                className="font-bold mx-1 bg-sky-700 hover:bg-sky-900 text-white px-3 py-0.5 rounded-lg"
              >
                <FaEdit />
              </button>
              <button
                // following will call that method as will as it will pass an event also and id 
                onClick={(e) => { handledelete(e, item.id) }}
                className="font-bold mx-1 bg-sky-700 hover:bg-sky-900 text-white px-3 py-0.5 rounded-lg"
              >
                <MdDelete />

              </button>
            </div>
          </div>
        })}
      </div>
    </>
  );
}

export default App;
