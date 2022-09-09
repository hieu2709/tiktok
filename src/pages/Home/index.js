import { useEffect, useState } from "react";
import HomeVideo from "~/components/Videos/HomeVideo";
import * as videoService from "~/services/videoService";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

const TYPE = "for-you";
const PAGE = 1;
function Home() {
  const [videoResult, setVideoResult] = useState([]);
  const [page, setPage] = useState(PAGE);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const fetchApi = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        // var urlencoded = new URLSearchParams();

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: null,
          redirect: "follow",
        };

        const result = await fetch(
          `https://tiktok.fullstack.edu.vn/api/videos?type=${TYPE}&page=${page}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result.data);
        setVideoResult((prev) => [...prev, ...result]);
        // console.log(result);
      };
      fetchApi();
    } else {
      const fetchApi = async () => {
        const result = await videoService.getVideo(TYPE, page);

        setVideoResult((prev) => [...prev, ...result]);
        // setVideoResult(result);
      };
      fetchApi();
    }

    //
    const wrapper = document.querySelector(".wrapper");
    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight ===
        wrapper.clientHeight + wrapper.offsetTop
      ) {
        // console.log("dung");
        setPage(page + 1);
      }
    });
  }, [page, token]);

  return (
    <div className={cx("wrapper")}>
      {videoResult.map((video) => (
        <HomeVideo key={video.id} data={video} userVideo={video.user} />
      ))}
    </div>
  );
}

export default Home;
