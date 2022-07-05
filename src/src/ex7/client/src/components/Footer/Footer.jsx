
import "./Footer.css"
import PropTypes from 'prop-types';
const Footer = ({numOfTasks,clearAllFromDb})=>{

   

    return (
        <footer>
           {numOfTasks>0 && <p  className="count"> You Have: {numOfTasks} Panding Tasks </p>}
            <button onClick={clearAllFromDb} className="clearAllBtn">Clear 🆑</button>
          </footer>
    )
}
Footer.propTypes={
    numOfTasks:PropTypes.number,
    clearAllFromDb:PropTypes.func

}


export default Footer