import React from "react";
import "./Spinner.scss";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const getSpinnerAttributes = ({ display }) => ({
    className: display ? 'spinner' : 'hide-spinner'
});

const Spinner = (props) => {

    return (
        <div id="spinner" {...getSpinnerAttributes(props)}>
            <div className="spinner-wrapper">
                <span className="icon-add-todo"><FontAwesomeIcon icon={faPen} /></span>
            </div>
        </div>
    );
};

getSpinnerAttributes.propTypes = {
    display: PropTypes.bool
}

export default Spinner;