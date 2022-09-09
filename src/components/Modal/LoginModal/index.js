import classNames from "classnames/bind";
import styles from "./LoginModal.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  AppleIcon,
  FaceBookIcon,
  GoogleIcon,
  InstagramIcon,
  KakaoTalkIcon,
  LineIcon,
  QRIcon,
  TwitterIcon,
  UserIcon,
} from "~/components/Icons";
import FormInput from "~/components/FormInput";
import OptionLoginButton from "~/components/OptionLoginButton";
import { useState } from "react";
import routesConfig from "~/config/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "~/redux/userReducers";
import { modalClose } from "~/redux/isOpenModalLogin";
const cx = classNames.bind(styles);
function LoginModal() {
  const [isShow, setIsShow] = useState(true);
  const [isHide, setIsHide] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleHide = () => {
    setIsHide(!isHide);
  };
  const handleChangeUserName = (e) => {
    const username = e.target.value;
    if (!username.startsWith(" ")) {
      setUsername(username);
    }
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    if (!password.startsWith(" ")) {
      setPassword(password);
    }
  };

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", username);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const result = await fetch(
      "https://tiktok.fullstack.edu.vn/api/auth/login",
      requestOptions
    )
      .then((response) =>
        response.ok ? response.json() : alert("Đăng nhập thất bại")
      )
      .then((result) => result);
    localStorage.setItem("token", result.meta.token);
    getUser(result.meta.token);
    if (localStorage.getItem("token")) {
      navigate(routesConfig.home);

      alert("Đăng nhập thành công");
      dispatch(modalClose());
    }
  };
  const getUser = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: null,
      redirect: "follow",
    };

    fetch("https://tiktok.fullstack.edu.vn/api/auth/me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data));
        // console.log(localStorage.getItem("user"));
        dispatch(userLogin(result.data));
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className={cx("wrapper")}>
      <OptionLoginButton
        title="Use QR Code"
        icon={<QRIcon />}
        isShow={isShow}
      />
      <OptionLoginButton
        title="Use Phone/ Email/ Username"
        icon={<UserIcon />}
        isShow={isShow}
        onClick={() => {
          setIsShow(false);
        }}
      />
      {!isShow && (
        <form onSubmit={handleSubmit}>
          <FormInput
            type={"email"}
            name={"username"}
            placeholder={"Input your username"}
            leftIcon={<FontAwesomeIcon icon={faUser} />}
            value={username}
            onChange={handleChangeUserName}
          />
          <FormInput
            type={isHide ? "password" : "text"}
            name={"password"}
            placeholder={"Input your password"}
            value={password}
            onChange={handleChangePassword}
            leftIcon={<FontAwesomeIcon icon={faKey} />}
            rightIcon={
              isHide ? (
                <span onClick={handleHide}>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </span>
              ) : (
                <span onClick={handleHide}>
                  <FontAwesomeIcon icon={faEye} />
                </span>
              )
            }
          />

          <button className={cx("btn-login")}>Login</button>
        </form>
      )}
      <OptionLoginButton
        title="Continue with Facebook"
        icon={<FaceBookIcon />}
        isShow={isShow}
      />
      <OptionLoginButton
        title="Continue with Google"
        icon={<GoogleIcon />}
        isShow={isShow}
      />
      <OptionLoginButton
        title="Continue with Twitter"
        icon={<TwitterIcon />}
        isShow={isShow}
      />
      <OptionLoginButton
        title="Continue with LINE"
        icon={<LineIcon />}
        isShow={isShow}
      />
      <OptionLoginButton
        title="Continue with KakaoTalk"
        icon={<KakaoTalkIcon />}
        isShow={isShow}
      />
      <OptionLoginButton title="Continue with Apple" icon={<AppleIcon />} />
      <OptionLoginButton
        title="Continue with Instagram"
        icon={<InstagramIcon />}
        isShow={isShow}
      />
    </div>
  );
}

export default LoginModal;
