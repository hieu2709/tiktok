import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./Video.module.scss";
const cx = classNames.bind(styles);
function Video({ data }) {
  const [isMute, setIsMute] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const handlePlay = () => {
    setIsPlay(true);
  };
  const handlePause = () => {
    setIsPlay(false);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("video")}>
        <ReactPlayer
          volume={isMute ? 0 : 1}
          className={cx("react-video")}
          playing={isPlay}
          width="100%"
          height="100%"
          url={data.file_url}
          loop
          onEnded={handlePause}
        />
        <div className={cx("action-video")}>
          <span>
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
      <div className={cx("desc")}>{data.description}</div>
    </div>
  );
}

export default Video;
