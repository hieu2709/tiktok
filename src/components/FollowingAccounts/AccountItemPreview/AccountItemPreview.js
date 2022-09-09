import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./AccountItemPreview.module.scss";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "~/redux/userReducers";
import { modalOpen } from "~/redux/isOpenModalLogin";
import { useState } from "react";

const cx = classNames.bind(styles);
function AccountItemPreview({ data }) {
  const [isFollow, setIsFollow] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleFollow = () => {
    if (Object.values(user).length === 0) {
      dispatch(modalOpen());
    } else {
      const token = localStorage.getItem("token");
      setIsFollow(false);
      FollowUser(token);
    }
  };
  const FollowUser = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://tiktok.fullstack.edu.vn/api/users/${data.id}/unfollow`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data);
        return result.data;
      });
  };
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <img className={cx("avatar")} alt={data.nickname} src={data.avatar} />
        {isFollow ? (
          <Button outline className={cx("follow-btn")} onClick={handleFollow}>
            Following
          </Button>
        ) : (
          <Button primary className={cx("follow-btn")} onClick={handleFollow}>
            Follow
          </Button>
        )}
      </header>
      <div className={cx("item-info")}>
        <p className={cx("nickname")}>
          <strong>{data.nickname}</strong>
          {data.tick && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </p>
        <p className={cx("name")}>{`${data.first_name} ${data.last_name}`}</p>
        <p className={cx("analytics")}>
          <strong className={cx("number")}>
            {data.followers_count} {data.followers_count > 1000000 && "M"}{" "}
          </strong>
          <span className={cx("title")}>Folowers</span>
          <strong className={cx("number")}>
            {data.likes_count} {data.likes_count > 1000000 && "M"}{" "}
          </strong>
          <span className={cx("title")}>Likes</span>
        </p>
      </div>
    </div>
  );
}
AccountItemPreview.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AccountItemPreview;
