import React, { useState } from 'react'
import Card from '../../components/card/Card'
import AddTask from '../../components/add_task/AddTask'
import TaskList from '../../components/task_list/TaskList'
import './Home.css'
import Loader from '../../components/loader/Loader'

function Home() {

    const [itemsFlag, setItemsFlag] = useState(true)
    const [loading, setLoading] = useState(false)

    return (
        <div className={"home-container"}>
            {loading && <Loader />}
            <Card width={"30%"} height={"60%"} heading={"Todo App"}>
                <AddTask loading={loading} setLoading={setLoading} flag={itemsFlag} setFlag={setItemsFlag}></AddTask>
                <TaskList
                    loading={loading}
                    setLoading={setLoading}
                    flag={itemsFlag}
                    setFlag={setItemsFlag}
                    itemAdded={itemsFlag}>
                </TaskList>
            </Card>
        </div>
    )
}

export default Home