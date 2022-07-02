import React ,{useState ,useEffect} from 'react'
import TodoForm from "./TodoForm"
import Todo from "./Todo"
import TodoController from "./TodoController"
import {fetchItems,deleteAll,createItem,statusChange} from "../itemClient.js"



function TodoList() {
    const [todos,setTodos] = useState([])
    const addTodo = async (todo) =>{
        if(!todo.item || /^\s*$/.test(todo.item)){
            return
        }
        const newTodos = [todo, ...todos]
        setTodos(newTodos)
        
        await createItem(todo.data);
        console.log(...todos);
    };

    const createNewItem =  (todo) =>{
        
        
        setTodos(todos.data);
        console.log(todos.data);
    }

    useEffect(() => {
        fetch("http://localhost:3000/")
          .then((res) => res.json())
          .then((data) => setTodos(data));
      }, []);
    const updateTodo = (todoId ,newValue) =>{
        // check if input has space init
        if(!newValue.item || /^\s*$/.test(newValue.item)){
            return
        }
        setTodos(prev => prev.map(item=>(item.id === todoId ?newValue : item)))

    }

    const removeTodo = id => {
        const removeArr =[...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
    };


    const completeTodo =id=>{
        let updatedTodos = todos.map(todo =>{
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    
    return (
        <>
          <h1>What's the Plan for Today?</h1>
          <TodoForm onSubmit={addTodo} createNewItem={createNewItem} />
          <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
          {/* <TodoController  /> */}
        </>
      );
    }

export default TodoList


// const createTodo = async (item) =>{
    //     await createItem(item);
    //     const items = await fetchItems();
    //     setTodos(items.data);
    //     console.log(item.data);