import React from 'react'
import Card from '../../components/card/Card'
import AddTask from '../../components/add_task/AddTask'
import TaskList from '../../components/task_list/TaskList'
import './Home.css'

function Home() {
    return (
        <div className={"home-container"}>
            <Card width={"30%"} height={"60%"} heading={"Todo App"}>
                <AddTask></AddTask>
                <TaskList></TaskList>
            </Card>
        </div>
    )
}

export default Home