import Video from "./Video/Video";
import classNames from "classnames/bind";
import styles from "./ProfileVideo.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function ProfileVideoList({ user }) {
  const [listVideo, setListVideo] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      var myHeaders = new Headers();
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const result = await fetch(
        `https://tiktok.fullstack.edu.vn/api/users/${user.id || 1}/videos`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => result.data)
        .catch((error) => console.log("error", error));
      if (result) {
        setListVideo(result);
      }
    };
    fetchApi();
  }, [user.id]);
  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Videos</span>
      <div className={cx("video-list")}>
        {listVideo
          ? listVideo.map((video) => <Video data={video} key={video.id} />)
          : "khong co video"}
      </div>
    </div>
  );
}

export default ProfileVideoList;
