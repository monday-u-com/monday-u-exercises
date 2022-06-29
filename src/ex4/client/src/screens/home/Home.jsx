import React, { useState } from 'react'
import Card from '../../components/card/Card'
import AddTask from '../../components/add_task/AddTask'
import TaskList from '../../components/task_list/TaskList'
import styles from './Home.module.css'
import Loader from '../../components/loader/Loader'

function Home() {

    const [itemsFlag, setItemsFlag] = useState(true)
    const [loading, setLoading] = useState(false)

    return (
        <div className={styles.home_container}>
            {loading && <Loader />}
            <Card width={"30%"} height={"60%"} heading={"Todo App"}>
                <AddTask loading={loading} setLoading={setLoading} flag={itemsFlag} setFlag={setItemsFlag}></AddTask>
                <TaskList
                    loading={loading}
                    setLoading={setLoading}
                    flag={itemsFlag}
                    setFlag={setItemsFlag}
                >
                </TaskList>
            </Card>
        </div>
    )
}

export default Home