import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import MenuItem from "./MenuItems";
import Header from "./Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "~/redux/userReducers";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);
function Menu({ children, items = [], hideOnClick = false }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParrent = !!item.children;
      const isLogout = item.logout;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isLogout) {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              dispatch(userLogout());
              navigate(routesConfig.home);
            }
            if (isParrent) {
              setHistory((prev) => [...prev, item.children]);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      hideOnClick={hideOnClick}
      offset={[20, 10]}
      delay={[0, 700]}
      placement="bottom-end"
      interactive
      render={(attrs) => (
        <div className={cx("menu-items")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title="Language"
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}

            <div className={cx("menu-scrollable")}> {renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
