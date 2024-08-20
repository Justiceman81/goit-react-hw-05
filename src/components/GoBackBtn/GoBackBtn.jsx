import { Link } from "react-router-dom";
import styles from "./GoBackBtn.module.css";
const GoBackBtn = ({ children, path }) => {
  return (
    <>
      <Link className={styles.goBackBtn} to={path}>
        {children}
      </Link>
    </>
  );
};
export default GoBackBtn;
