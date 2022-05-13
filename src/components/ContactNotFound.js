import { Link } from "react-router-dom";

import Styles from "./styles/ContactNotFound.module.css";

const ContactNotFound = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.imageBox}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3240/3240853.png"
          alt="not found"
        />
      </div>
      <div>Contact Not Found</div>
      <Link to={"/"}>
        <div className={Styles.backHome}>Home</div>
      </Link>
    </div>
  );
};

export default ContactNotFound;
