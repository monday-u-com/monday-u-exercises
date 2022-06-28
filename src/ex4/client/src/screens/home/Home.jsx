import React, { useState } from 'react'
import Card from '../../components/card/Card'
import AddTask from '../../components/add_task/AddTask'
import TaskList from '../../components/task_list/TaskList'
import './Home.css'

function Home() {

    const [itemsFlag, setItemsFlag] = useState(true)

    return (
        <div className={"home-container"}>
            <Card width={"30%"} height={"60%"} heading={"Todo App"}>
                <AddTask flag={itemsFlag} setFlag={setItemsFlag}></AddTask>
                <TaskList flag={itemsFlag} setFlag={setItemsFlag} itemAdded={itemsFlag}></TaskList>
            </Card>
        </div>
    )
}

export default Home