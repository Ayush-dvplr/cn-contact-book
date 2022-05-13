import { Link } from "react-router-dom";

import Styles from "./Styles/_404.module.css";

const _404 = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.NotFound}>
        <div>404</div>
        <div>Not Found</div>
      </div>
      <div className={Styles.backHome}>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default _404;
