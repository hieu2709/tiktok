import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function Button({
  to,
  state,
  href,
  text = false,
  primary = false,
  outline = false,
  rounded = false,
  small = false,
  large = false,
  leftIcon,
  children,
  className,
  type,
  form,
  onClick,
  ...passProps
}) {
  let Component = "button";
  const props = {
    type,
    form,
    onClick,
    ...passProps,
  };
  if (to) {
    props.to = to;
    props.state = state;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = "a";
  }
  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    small,
    large,
  });
  return (
    <Component className={classes} {...props}>
      {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
      <span>{children}</span>
    </Component>
  );
}
Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.bool,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  leftIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
