import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faGlobe,
  faEllipsisVertical,
  faKeyboard,
  faPersonCircleQuestion,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import Tippy from "@tippyjs/react";
import styles from "./Header.module.scss";
import images from "~/assets/images";

import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";
import { faUser, faGem } from "@fortawesome/free-regular-svg-icons";
import "tippy.js/dist/tippy.css";
import { InboxIcon, MessageIcon } from "~/components/Icons";
import Image from "~/components/Images";
import Search from "~/layouts/components/Search";
import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "~/redux/userReducers";
import ModalNoLogin from "~/components/Modal/ModalNoLogin/ModalNoLogin";
import { modalOpen } from "~/redux/isOpenModalLogin";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          code: "en",
          title: "English",
        },
        {
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faPersonCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

// const token = localStorage.getItem("token");
function Header() {
  const user = useSelector(selectUser);
  const [isLogin, setIsLogin] = useState(!!user);
  const dispatch = useDispatch();
  const USER_MENU = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: `/@${user.nickname}`,
      state: { user: user },
    },
    {
      icon: <FontAwesomeIcon icon={faGem} />,
      title: "Get Coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/settings",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      logout: true,
      separate: true,
    },
  ];
  const handleClickOpenModal = () => {
    dispatch(modalOpen());
  };
  useEffect(() => {
    if (Object.values(user).length !== 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={routesConfig.home} className={cx("logo")}>
          <img src={images.logo} alt="TikTok" />
        </Link>

        <Search />
        <div className={cx("actions")}>
          {isLogin ? (
            <>
              <Button
                to={routesConfig.upload}
                text
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                Upload
              </Button>
              <Tippy delay={[0, 200]} content="Message" placement="bottom">
                <button className={cx("btn-message", "btn-action")}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                <button className={cx("btn-inbox", "btn-action")}>
                  <InboxIcon />
                </button>
              </Tippy>
              <Menu items={USER_MENU}>
                <Image
                  className={cx("user-image")}
                  src={user.avatar || null}
                  alt={user.nickname}
                />
              </Menu>
            </>
          ) : (
            <>
              <Button
                text
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleClickOpenModal}
              >
                Upload
              </Button>
              {/* <Button text>Register</Button> */}
              <Button primary onClick={handleClickOpenModal}>
                Log in
              </Button>
              <Menu items={MENU_ITEMS}>
                <button className={cx("more-btn")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </Menu>
            </>
          )}
        </div>
      </div>
      <ModalNoLogin />
    </header>
  );
}

export default Header;
