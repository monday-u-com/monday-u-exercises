import { useRef, useState } from "react";
import "./TodoControls.module.css";

const TodoControls = ({renderNewItems}) => {
    const [input,setInput] = useState("");

    const handleEnterPress = (event) =>{
        if(event.key === "Enter"){
            event.preventDefault();
            renderNewItems(input);
        }
    };
    const handleClick = () => {
        renderNewItems(input);
      };
    return (
        <div>
            <div className="list-controls">
                <input type="text" id="list-item-input" placeholder="Enter New Todo..."
                 onKeyPress={handleEnterPress} onChange={(event)=> setInput(event.target.value)}/>
                 <button type="button" id="list-item-submit" onClick={handleClick}>🔥</button>
            </div>
        </div>
    );
};

export default TodoControls;