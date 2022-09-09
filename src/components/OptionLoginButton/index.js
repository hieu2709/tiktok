import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./OptionLoginButton.module.scss";

const cx = classNames.bind(styles);

function OptionLoginButton({ icon, title, onClick, isShow }) {
  if (!isShow) {
    return null;
  } else {
    return (
      <div className={cx("wrapper")} onClick={onClick}>
        <span className={cx("left-icon")}>{icon}</span>
        <div className={cx("title")}>{title}</div>
      </div>
    );
  }
}
OptionLoginButton.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
export default OptionLoginButton;
