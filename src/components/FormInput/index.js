import classNames from "classnames/bind";
import styles from "./FormInput.module.scss";

const cx = classNames.bind(styles);
function FormInput({
  leftIcon,
  placeholder = "",
  type = "text",
  name = "",
  rightIcon,
  onChange,
  value,
}) {
  return (
    <div className={cx("wrapper")}>
      <input
        type={type}
        name={name}
        id={name}
        spellCheck={false}
        className={cx("input")}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <span htmlFor={name} className={cx("left-icon", "icon")}>
        {leftIcon}
      </span>
      <span className={cx("right-icon", "icon")}>{rightIcon}</span>

      <br></br>
    </div>
  );
}

export default FormInput;
