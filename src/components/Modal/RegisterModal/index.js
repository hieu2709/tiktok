import classNames from "classnames/bind";
import styles from "./RegisterModal.module.scss";
import { useState } from "react";
import {
  FaceBookIcon,
  GoogleIcon,
  KakaoTalkIcon,
  LineIcon,
  TwitterIcon,
  UserIcon,
} from "~/components/Icons";
import OptionLoginButton from "~/components/OptionLoginButton";
import FormInput from "~/components/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function RegisterModal() {
  const [isShow, setIsShow] = useState(true);
  const [isHide, setIsHide] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      type: "email",
      email: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      "https://tiktok.fullstack.edu.vn/api/auth/register",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          response.json();
          alert("Đăng kí thành công");
        } else {
          alert("Đăng kí thất bại");
        }
      })
      .then((result) => result);
  };

  return (
    <div className={cx("wrapper")}>
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

          <button className={cx("btn-signup")}>Sign up</button>
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
    </div>
  );
}

export default RegisterModal;
