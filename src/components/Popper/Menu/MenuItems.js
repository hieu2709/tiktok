import Button from "~/components/Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
const cx = classNames.bind(styles);
function MenuItems({ data, onClick }) {
  const className = cx("menu-item", {
    separate: data.separate,
  });
  return (
    <Button
      className={className}
      leftIcon={data.icon}
      to={data.to}
      state={data.state}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

export default MenuItems;
