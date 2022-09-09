import { useEffect, useState } from "react";
import Modal from "../Modal";
import classNames from "classnames/bind";
import styles from "./ModalNoLogin.module.scss";
import AuthModal from "../AuthModal";
import { CloseIcon } from "~/components/Icons";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { modalClose, selectIsOpenModal } from "~/redux/isOpenModalLogin";
const cx = classNames.bind(styles);

function ModalNoLogin() {
  const isOpen = useSelector(selectIsOpenModal);
  const dispatch = useDispatch();
  // const [modalIsOpen, setIsOpen] = useState(isOpen);
  const [toggle, setToggle] = useState(true);
  const clickToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    setToggle(true);
  }, [isOpen]);
  // function openModal() {
  //   setIsOpen(true);
  //   setToggle(true);
  // }
  function closeModal() {
    dispatch(modalClose());
  }
  return (
    <div>
      <Modal isOpen={isOpen}>
        <div className={cx("close-icon")} onClick={closeModal}>
          <CloseIcon />
        </div>
        <AuthModal
          title="Log in to TikTok"
          question="Don't have account?"
          buttonTitle="Sign up"
          isOpen={toggle}
          onClick={clickToggle}
        >
          <LoginModal />
        </AuthModal>

        <AuthModal
          title="Sign up for TikTok"
          question="Already have account?"
          buttonTitle="Sign in"
          isOpen={!toggle}
          onClick={clickToggle}
        >
          <RegisterModal />
        </AuthModal>
      </Modal>
    </div>
  );
}

export default ModalNoLogin;
