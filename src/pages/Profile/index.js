import UserLayout from "~/components/UserLayout";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import ProfileVideo from "~/components/Videos/ProfileVideo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Profile(props) {
  const [user, setUser] = useState({});
  const location = useLocation();
  // const nickname = location.state.user.nickname;
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const fetchApi = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const result = await fetch(
          `https://tiktok.fullstack.edu.vn/api/users/@${location.state.user.nickname}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result.data)
          .catch((error) => console.log("error", error));
        setUser(result);
      };
      fetchApi();
    } else {
      const fetchApi = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const result = await fetch(
          `https://tiktok.fullstack.edu.vn/api/users/@${location.state.user.nickname}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result.data)
          .catch((error) => console.log("error", error));
        setUser(result);
      };
      fetchApi();
    }
    // console.log(location.state.user);
  }, [location, token]);
  return (
    <div className={cx("wrapper")}>
      <UserLayout user={user} />
      <ProfileVideo user={user} />
    </div>
  );
}

export default Profile;
