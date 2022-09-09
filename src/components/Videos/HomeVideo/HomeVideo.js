import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./HomeVideo.module.scss";
import ReactPlayer from "react-player";
import { useState } from "react";
import Image from "~/components/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faComment,
  faHeart,
  faMusic,
  faPause,
  faPlay,
  faShare,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "~/redux/userReducers";
import { modalOpen } from "~/redux/isOpenModalLogin";

const cx = classNames.bind(styles);

function HomeVideo({ data, userVideo }) {
  const [isPlay, setIsPlay] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [likeClick, setLikeClick] = useState(false);
  const [isFollow, setIsFollow] = useState(userVideo.is_followed);
  // const [isFollow, setIsFollow] = useState(true);
  const handlePlay = () => {
    setIsPlay(true);
  };
  const handlePause = () => {
    setIsPlay(false);
  };
  const handleLike = () => {
    setLikeClick(!likeClick);
  };
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
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
      `https://tiktok.fullstack.edu.vn/api/users/${userVideo.id}/${type}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data);
        return result.data;
      });
  };
  const isUser = user.id === userVideo.id;
  return (
    <div className={cx("wrapper")}>
      <Image
        className={cx("avatar")}
        src={data.user.avatar}
        alt={data.user.nickname}
      />
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div className={cx("left-header")}>
            <div className={cx("info")}>
              <div className={cx("name")}>
                <span className={cx("nickname")}>{data.user.nickname}</span>
                {data.user.tick && (
                  <FontAwesomeIcon
                    className={cx("check")}
                    icon={faCheckCircle}
                  />
                )}
                <span
                  className={cx("fullname")}
                >{`${data.user.first_name} ${data.user.last_name}`}</span>
              </div>
              <p className={cx("desc")}>{data.description}</p>
              <FontAwesomeIcon className={cx("music-icon")} icon={faMusic} />
              <span
                className={cx("music-name")}
              >{`Nhạc nền - ${data.music}`}</span>
            </div>
          </div>
          <div className="action">
            {isUser ? null : isFollow || isUser ? (
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
        <div
          className={cx("video-container")}
          onMouseEnter={isClick ? null : handlePlay}
          onMouseLeave={() => {
            handlePause();
            setIsClick(false);
          }}
        >
          <div className={cx("video")}>
            <ReactPlayer
              volume={isMute ? 0 : 1}
              className={cx("react-video")}
              playing={isPlay}
              width="100%"
              height="100%"
              url={data.file_url}
              loop
              // onEnded={handlePause}
            />
            <div className={cx("action-video")}>
              <span onClick={() => setIsClick(true)}>
                {isPlay ? (
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faPause}
                    onClick={handlePause}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faPlay}
                    onClick={handlePlay}
                  />
                )}
              </span>
              <span>
                {isMute ? (
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faVolumeMute}
                    onClick={() => setIsMute(false)}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faVolumeHigh}
                    onClick={() => setIsMute(true)}
                  />
                )}
              </span>
            </div>
          </div>
          <div className={cx("actions")}>
            <div className={cx("wrap-action")} onClick={handleLike}>
              {likeClick ? (
                <span className={cx("action-btn")}>
                  <FontAwesomeIcon className={cx("liked")} icon={faHeart} />
                </span>
              ) : (
                <span className={cx("action-btn")}>
                  <FontAwesomeIcon
                    className={cx("icon-action")}
                    icon={faHeart}
                    // onClick={handleLike}
                  />
                </span>
              )}
              <span className={cx("number")}>{data.likes_count}</span>
            </div>
            <div className={cx("wrap-action")}>
              <span className={cx("action-btn")}>
                <FontAwesomeIcon
                  className={cx("icon-action")}
                  icon={faComment}
                />
              </span>
              <span className={cx("number")}>{data.comments_count}</span>
            </div>
            <div className={cx("wrap-action")}>
              <span className={cx("action-btn")}>
                <FontAwesomeIcon className={cx("icon-action")} icon={faShare} />
              </span>
              <span className={cx("number")}>{data.shares_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
HomeVideo.propTyes = {
  url: PropTypes.string.isRequired,
};
export default HomeVideo;
