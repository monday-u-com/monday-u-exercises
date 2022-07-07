import React from "react";
import "./Spinner.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const getSpinnerAttributes = ({spinnerValue}) => ({
    className: spinnerValue ? 'spinner' : 'hide-spinner'
});

const Spinner = ({spinnerValue}) => {
    return (
        <div id="spinner" {...getSpinnerAttributes({spinnerValue})}>
            <div className="spinner-wrapper">
                <span className="icon-add-todo"><FontAwesomeIcon icon={faPen}/></span>
            </div>
        </div>
    );
};

getSpinnerAttributes.propTypes = {
    // spinnerValue:
}

export default Spinner;