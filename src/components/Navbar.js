import { Link } from "react-router-dom";

import Styles from "./styles/Navbar.module.css";

const Navbar = () => {
  return (
    <header>
      <Link to={"/"}>
        <div className={Styles.header}>Contacts</div>
      </Link>
    </header>
  );
};

export default Navbar;
