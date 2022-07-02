import React , { useState,useEffect,useRef } from 'react'

function TodoController(props){
    const [input,setInput] = useState('');

    const inputRef = useRef(null)

    useEffect(()=>{
      inputRef.current.focus()
    })


    const handleChange = e =>{
    setInput(e.target.value);
  };
  
  const handleSubmit = e =>{
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      item : input
    });
    setInput('')
  };
  return (
    
    <form onSubmit={handleSubmit} onClick="" className='todo-form'>
    {props.edit ? (
      <>
        <input
          placeholder='Update your item'
          value={input}
          onChange={handleChange}
          name='text'
          ref={inputRef}
          className='todo-input edit'
        />
        <button onClick={handleSubmit} className='todo-button edit'>
          Update
        </button>
      </>
    ) : (
      <>
        <input
          placeholder='Add a todo'
          value={input}
          onChange={handleChange}
          name='text'
          className='todo-input'
          ref={inputRef}
        />
        <button onClick={handleSubmit} className='todo-button'>
          Add todo
        </button>
      </>
    )}
  </form>
  )
}

export default TodoController