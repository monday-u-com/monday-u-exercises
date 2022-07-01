import styles from "./Icon.module.css";
const Icon = ({ iconClassName, style, src, onClickIconHandler }) => {
  return (
    <img
      className={styles[iconClassName]}
      style={style}
      src={src}
      alt={""}
      onClick={onClickIconHandler}
    />
  );
};

export default Icon;
