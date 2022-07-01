import { useState } from "react";
import styles from "./Sort.module.css";
import upArrow from "../../assets/images/up_arrow.svg";
import downArrow from "../../assets/images/down_arrow.svg";
import PropTypes from "prop-types";
import { sortTasks } from "../../serverApi/itemClient";
const Sort = ({ onClickSortUpdateData, setToastProps }) => {
  const [direction, setDirection] = useState("up");
  const onClickSortHandler = async () => {
    const sortResult = await sortTasks(direction);
    if (sortResult.result === "success") {
      const sortOrderType = direction === "up" ? "descending" : "ascending";
      if (direction === "up") {
        setDirection("down");
      } else {
        setDirection("up");
      }
      onClickSortUpdateData(sortResult.data);

      setToastProps({
        showToast: true,
        toastType: "POSITIVE",
        message: `Your task now displayed in ${sortOrderType} order`,
      });
      setTimeout(() => {
        setToastProps({
          showToast: false,
          toastType: "",
          message: "",
        });
      }, 5000);
    } else {
      setToastProps({
        showToast: true,
        toastType: "NEGATIVE",
        message: sortResult.data,
      });
    }
  };
  return (
    <div className={styles.listSortControl}>
      <div
        className={styles.listSortButton}
        style={{ marginRight: "5px", fontSize: "18px" }}
        onClick={onClickSortHandler}
      >
        sort
        <img
          src={direction === "up" ? upArrow : downArrow}
          style={{ height: "20px", width: "20px" }}
          alt={""}
        />
      </div>
    </div>
  );
};

Sort.propTypes = {
  onClickSortUpdateData: PropTypes.func,
  setToastProps: PropTypes.func,
};

Sort.defaultProps = {
  onClickSortUpdateData: "none", /// need to check it with ayelet
  setToastProps: "none",
};

export default Sort;
