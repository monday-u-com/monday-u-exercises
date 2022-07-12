
import "./Footer.css"
import PropTypes from 'prop-types';
const Footer = ({numOfTasks,clearAllItemsAction})=>{
    const handleClearAll = async () =>{
        await clearAllItemsAction();
    }
   

    return (
        <footer>
            <p className="count"> You Have: {numOfTasks}  Panding Tasks </p>
            <button onClick={handleClearAll} className="clearAllBtn">
                Clear 🆑
            </button>
            </footer>
  );
};
Footer.propTypes={
    numOfTasks:PropTypes.number,
    clearAllItemsAction:PropTypes.func

}


export default Footer;