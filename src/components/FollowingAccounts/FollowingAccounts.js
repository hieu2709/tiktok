import classNames from "classnames/bind";
import styles from "./FollowingAccounts.module.scss";
import PropTypes from "prop-types";
import AccountItem from "./AccountItem";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function FollowingAccounts({ label, data = [], handleSeeMore, handleSeeLess }) {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      {data.map((account) => (
        <Link
          to={`/@${account.nickname}`}
          state={{ user: account }}
          key={account.id}
        >
          <AccountItem data={account} />
        </Link>
      ))}
      <div className={cx("btn-see")}>
        <p className={cx("load-more-btn")} onClick={handleSeeMore}>
          See more
        </p>
        <p className={cx("load-more-btn")} onClick={handleSeeLess}>
          See less
        </p>
      </div>
    </div>
  );
}
FollowingAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
};
export default FollowingAccounts;
