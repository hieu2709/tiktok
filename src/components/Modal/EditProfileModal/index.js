// import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./EditProfileModal.module.scss";
import Image from "~/components/Images";
import Button from "~/components/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { useDispatch } from "react-redux";
import { userUpdate } from "~/redux/userReducers";

const cx = classNames.bind(styles);

function EditProfileModal({ isOpen = false, onClick, user }) {
  const [username, setUsername] = useState(user.nickname);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setUsername(value);
    }
  };
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setFirstName(value);
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setLastName(value);
    }
  };
  const handleBioChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setBio(value);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    avatar.preview && formdata.append("avatar", avatar, avatar.preview);
    formdata.append("bio", bio);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const result = await fetch(
      "https://tiktok.fullstack.edu.vn/api/auth/me?_method=PATCH",
      requestOptions
    )
      .then((response) =>
        response.ok ? response.json() : alert("Cập nhật thất bại")
      )
      .then((result) => result.data);
    if (result) {
      dispatch(userUpdate(result));
      alert("Cập nhật thành công");
      onClick();
    }
  };

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("title-header")}>Edit Profile</div>
        <form onSubmit={handleSubmitUpdate} id="updateForm">
          <div className={cx("profile-photo", "inputWrapper")}>
            <div className={cx("title")}>Profile Photo</div>
            <div className={cx("avatar-upload")}>
              <div className={cx("edit-wrap")}>
                <div>
                  {avatar ? (
                    <Image
                      className={cx("avatar")}
                      src={avatar.preview || avatar}
                      alt=""
                    />
                  ) : (
                    <Image
                      className={cx("avatar")}
                      src={images.noImage}
                      alt=""
                    />
                  )}
                </div>

                <input
                  type="file"
                  name="upload"
                  accept="image/*"
                  id="upload"
                  className={cx("input-image")}
                  onChange={handleChangeImage}
                />
                <label htmlFor="upload" className={cx("upload-btn")}>
                  <FontAwesomeIcon icon={faPenNib} />
                </label>
              </div>
            </div>
          </div>
          <div className={cx("user-name", "inputWrapper")}>
            <div className={cx("title")}>Username</div>
            <input
              spellCheck="false"
              className={cx("data")}
              type="text"
              value={username}
              onChange={handleUsernameChange}
              disabled
            />
          </div>
          <div className={cx("first-name", "inputWrapper")}>
            <div className={cx("title")}>First Name</div>
            <input
              spellCheck="false"
              className={cx("data")}
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className={cx("last-name", "inputWrapper")}>
            <div className={cx("title")}>Last Name</div>
            <input
              spellCheck="false"
              className={cx("data")}
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className={cx("bio", "inputWrapper")}>
            <div className={cx("title")}>Bio</div>
            <textarea
              spellCheck="false"
              className={cx("textarea")}
              rows="4"
              cols="50"
              value={bio}
              onChange={handleBioChange}
            />
          </div>
        </form>
        <div className={cx("button")}>
          <Button text type="cancel" onClick={onClick}>
            Cancel
          </Button>
          <Button primary type="submit" form="updateForm">
            Save
          </Button>
        </div>
      </div>
    );
  }
}

// EditProfileModal.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };
export default EditProfileModal;
