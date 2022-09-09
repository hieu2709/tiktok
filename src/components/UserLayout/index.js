import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "~/redux/isOpenModalLogin";
import { selectUser } from "~/redux/userReducers";
import Button from "../Button";
import { CloseIcon } from "../Icons";
import Image from "../Images";
import Modal from "../Modal";
import EditProfileModal from "../Modal/EditProfileModal";
import styles from "./UserLayout.module.scss";
const cx = classNames.bind(styles);

function UserLayout({ user }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    if (user.is_followed) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [user.is_followed]);
  const me = useSelector(selectUser);
  const dispatch = useDispatch();
  const isMe = me.id === user.id;
  const handleUnFollow = () => {
    const token = localStorage.getItem("token");
    setIsFollow(false);
    FollowUser(token, "unfollow");
  };
  const handleFollow = () => {
    if (Object.values(user).length === 0) {
      dispatch(modalOpen());
    } else {
      const token = localStorage.getItem("token");
      setIsFollow(true);
      FollowUser(token, "follow");
    }
  };

  const FollowUser = async (token, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://tiktok.fullstack.edu.vn/api/users/${user.id}/${type}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data);
        return result.data;
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("user-info")}>
        <div className={cx("main-info")}>
          <div>
            <Image
              className={cx("avatar")}
              src={user.avatar}
              alt={user.nickname}
            />
          </div>
          <div className={cx("name")}>
            <div className={cx("nick-name")}>{user.nickname}</div>
            <div
              className={cx("full-name")}
            >{`${user.first_name} ${user.last_name}`}</div>

            {isMe ? (
              <Button
                text
                leftIcon={
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={cx("btn-edit")}
                  />
                }
                onClick={openModal}
              >
                Edit Profile
              </Button>
            ) : isFollow ? (
              <Button
                outline
                className={cx("follow-btn")}
                onClick={handleUnFollow}
              >
                Following
              </Button>
            ) : (
              <Button
                primary
                className={cx("follow-btn")}
                onClick={handleFollow}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
        <div className={cx("count-info")}>
          <span className={cx("count-number")}>
            {user.followings_count || 0}
          </span>
          <span className={cx("title")}>Following</span>

          <span className={cx("count-number")}>
            {user.followers_count || 0}
          </span>
          <span className={cx("title")}>Followers</span>
          <span className={cx("count-number")}>{user.likes_count}</span>
          <span className={cx("title")}>Likes</span>
        </div>
        <div className={cx("bio-info")}>{user.bio || "No bio yet"}</div>
      </div>

      <Modal isOpen={modalIsOpen}>
        <div className={cx("edit-profile-modal")}>
          <div className={cx("close-icon")} onClick={closeModal}>
            <CloseIcon />
          </div>
          <EditProfileModal isOpen={true} onClick={closeModal} user={user} />
        </div>
      </Modal>
    </div>
  );
}

export default UserLayout;
