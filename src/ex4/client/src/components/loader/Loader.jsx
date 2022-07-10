import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import styles from './Loader.module.css'

function Loader() {
    return (
        <div className={styles.loader_container}>
            <ClipLoader size={300} color={"#87CEEB"}></ClipLoader>
        </div>
    )
}

export default Loader