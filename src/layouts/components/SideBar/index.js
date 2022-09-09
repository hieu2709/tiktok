import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import Menu, { MenuItem } from "./Menu";
import routesConfig from "~/config/routes";
import { HomeIcon, UserGroupIcon, LiveIcon } from "~/components/Icons";
import SuggestedAccounts from "~/components/SuggestedAccounts";
import * as userService from "~/services/userService";
import { useSelector } from "react-redux";
import { selectUser } from "~/redux/userReducers";
import FollowingAccounts from "~/components/FollowingAccounts";
const cx = classNames.bind(styles);
const PER_PAGE = 5;
function SideBar() {
  const [perPage, setPerPage] = useState(PER_PAGE);
  const [isSeeAll, setIsSeeAll] = useState(false);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const [page, setPage] = useState(1);
  const user = useSelector(selectUser);
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const FetchData = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: null,
        redirect: "follow",
      };

      const result = await fetch(
        `https://tiktok.fullstack.edu.vn/api/me/followings?page=${page}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // listFollow.push(...result.data);
          return result;
        });
      if (page === 1) {
        setFollowingUser(result.data);
      } else {
        setFollowingUser((prev) => prev.concat(result.data));
      }
    };
    FetchData();
  }, [page, token]);
  useEffect(() => {
    if (Object.values(user).length === 0) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [user]);

  //

  //suggest user
  useEffect(() => {
    if (token) {
      const FetchApi = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&&per_page=${perPage}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            let accountNoFollow = result.data.filter((acc) => {
              if (acc.is_followed === true) {
                return false;
              }
              return true;
            });
            setSuggestedUser(accountNoFollow);
            // console.log("co token");
          });
      };
      FetchApi();
    } else {
      userService
        .getSuggest({ page: 1, perPage })
        .then((data) => {
          setSuggestedUser(data);
        })
        .catch((error) => console.log(error));
    }
    //
  }, [perPage, token]);

  const handleViewChange = () => {
    setIsSeeAll((prev) => !prev);
    if (isSeeAll) {
      setPerPage(PER_PAGE);
    } else {
      setPerPage(PER_PAGE + 15);
    }
  };
  const handleSeeMore = () => {
    setPage(page + 1);
  };
  const handleSeeLess = () => {
    setPage(1);
  };
  return (
    <aside className={cx("wrapper")}>
      <Menu className={cx("menu")}>
        <MenuItem title="For You" to={routesConfig.home} icon={<HomeIcon />} />
        <MenuItem
          title="Following"
          to={routesConfig.following}
          icon={<UserGroupIcon />}
        />
        <MenuItem title="Live" to={routesConfig.live} icon={<LiveIcon />} />
      </Menu>
      <SuggestedAccounts
        label="Suggested Account"
        data={suggestedUser}
        isSeeAll={isSeeAll}
        onViewChange={handleViewChange}
      />
      {isLogin && (
        <FollowingAccounts
          label="Following Account"
          data={followingUser}
          handleSeeMore={handleSeeMore}
          handleSeeLess={handleSeeLess}
        />
      )}
    </aside>
  );
}

export default SideBar;
