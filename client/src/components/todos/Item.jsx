import React, { useCallback, useState } from "react";
import styles from "./Item.module.css";
import deleteIcon from "../../assets/images/delete_icon.svg";
import editIcon from "../../assets/images/edit_icon.svg";
import saveIcon from "../../assets/images/save_icon.svg";
import PropTypes from "prop-types";
import {
  deleteTaskById,
  flipStatus,
  updateTaskText,
} from "../../serverApi/itemClient";
import Icon from "./Icon";

const Item = ({
  itemName,
  id,
  status,
  removeIdFromDataHandler,
  onChangeValueUpdateDataHandler,
  setToastProps,
  checkIfTextAlreadyExist,
}) => {
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [textReadOnly, setTextReadOnly] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [textAfterEdit, setTextAfterEdit] = useState(itemName);

  const onClickEditItemHandler = () => {
    setShowSaveButton(true);
    setShowEditButton(false);
    setTextReadOnly(false);
    setIsEdit(true);
  };

  const onClickSaveItemHandler = async () => {
    setShowSaveButton(false);
    setShowEditButton(true);
    setTextReadOnly(true);
    const textBeforeEdit = itemName;
    const editTaskResult = await updateTaskText(id, textAfterEdit);
    const isNewTextAlreadyExist = checkIfTextAlreadyExist(editTaskResult.data);
    if (editTaskResult.result === "success") {
      if (isNewTextAlreadyExist) {
        if (textBeforeEdit !== textAfterEdit) {
          setToastProps({
            showToast: true,
            toastType: "P",
            message: "Task already exist in ToDO App",
          });
        }
      } else {
        setTextAfterEdit(editTaskResult.data);
        onChangeValueUpdateDataHandler(id, "itemName", editTaskResult.data);
        setToastProps({
          showToast: true,
          toastType: "POSITIVE",
          message: "Task successfully edited & saved",
        });
        setTimeout(() => {
          setToastProps({
            showToast: false,
            toastType: "",
            message: "",
          });
        }, 5000);
      }
    } else {
      setToastProps({
        showToast: true,
        toastType: "NEGATIVE",
        message: editTaskResult.data,
      });
    }

    setIsEdit(false);
  };

  const onClickDeleteItemHandler = useCallback(async () => {
    const deleteByIdResult = await deleteTaskById(id);
    if (deleteByIdResult.result === "success") {
      removeIdFromDataHandler(id);
      setToastProps({
        showToast: true,
        toastType: "POSITIVE",
        message: "Task successfully deleted",
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
        message: deleteByIdResult.data,
      });
    }
  }, [id, removeIdFromDataHandler, setToastProps]);

  const onClickstatusCheckBoxHandler = useCallback(async () => {
    const flipStatusResult = await flipStatus(id);
    if (flipStatusResult.result === "success") {
      onChangeValueUpdateDataHandler(id, "status", flipStatusResult.data);
      setToastProps({
        showToast: true,
        toastType: "POSITIVE",
        message: flipStatusResult.data
          ? "Task status successfully checked"
          : "Task status successfully unchecked",
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
        message: flipStatusResult.data,
      });
    }
  }, [id, onChangeValueUpdateDataHandler, setToastProps]);

  const onChangeTaskTextHandler = (e) => {
    setTextAfterEdit(e.target.value);
  };
  return (
    <div
      className={`${styles.listItem} ${status ? styles.inputTextTaskDone : ""}`}
    >
      <input
        className={styles.itemStatus}
        type="checkbox"
        checked={status}
        onChange={onClickstatusCheckBoxHandler}
      />

      <input
        className={isEdit ? styles.itemTextEditMode : styles.itemText}
        type="text"
        value={!isEdit ? itemName : textAfterEdit}
        readOnly={textReadOnly}
        onChange={onChangeTaskTextHandler}
      />
      {showEditButton && !status && (
        <Icon
          iconClassName={["listItemIcon"]}
          style={{ marginLeft: "auto" }}
          src={editIcon}
          onClickIconHandler={onClickEditItemHandler}
        />
      )}
      {showSaveButton && !status && (
        <Icon
          iconClassName={["listItemIcon"]}
          style={{ marginLeft: "auto" }}
          src={saveIcon}
          onClickIconHandler={onClickSaveItemHandler}
        />
      )}
      <Icon
        iconClassName={["listItemIcon"]}
        style={status ? { marginLeft: "auto" } : {}}
        src={deleteIcon}
        onClickIconHandler={onClickDeleteItemHandler}
      />
    </div>
  );
};

Item.propTypes = {
  itemName: PropTypes.string,
  status: PropTypes.bool,
  removeIdFromDataHandler: PropTypes.func,
  onChangeValueUpdateDataHandler: PropTypes.func,
  setToastProps: PropTypes.func,
};

Item.defaultProps = {
  itemName: "task text",
  status: false,
  removeIdFromDataHandler: "none", /// need to check it with ayelet
  onChangeValueUpdateDataHandler: "none",
  setToastProps: NOOP,
};

export default Item;
