import classNames from "classnames/bind";
import styles from "./SuggestedAccounts.module.scss";
import PropTypes from "prop-types";
import AccountItem from "./AccountItem";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SuggestedAccounts({
  label,
  isSeeAll = false,
  data = [],
  onViewChange,
}) {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      {data.map((account) => {
        return (
          <Link
            to={`/@${account.nickname}`}
            state={{ user: account }}
            key={account.id}
          >
            <AccountItem data={account} />
          </Link>
        );
      })}
      <p className={cx("load-more-btn")} onClick={() => onViewChange(isSeeAll)}>
        {isSeeAll ? "See Less" : "See All"}
      </p>
    </div>
  );
}
SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
};
export default SuggestedAccounts;
