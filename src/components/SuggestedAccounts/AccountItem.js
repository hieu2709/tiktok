import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./SuggestedAccounts.module.scss";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import AccountItemPreview from "./AccountItemPreview";
import PropTypes from "prop-types";
import Image from "../Images";
const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <div className={cx("preview")}>
            <AccountItemPreview data={data} />
          </div>
        </PopperWrapper>
      </div>
    );
  };
  return (
    <div>
      <Tippy
        offset={[-10, 0]}
        interactive
        delay={[800, 0]}
        placement="bottom-start"
        render={renderPreview}
      >
        <div className={cx("account-item")}>
          <Image
            className={cx("avatar")}
            src={data.avatar}
            alt={data.nickname}
          />
          <div className={cx("item-info")}>
            <p className={cx("nickname")}>
              <strong>{data.nickname}</strong>
              {data.tick && (
                <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
              )}
            </p>
            <p
              className={cx("name")}
            >{`${data.first_name} ${data.last_name}`}</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}
AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AccountItem;
