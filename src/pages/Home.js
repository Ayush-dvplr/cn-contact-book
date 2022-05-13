import { Link } from "react-router-dom";

import { Loader } from "../components";
import Styles from "./Styles/Home.module.css";

const Home = ({ loading, contacts }) => {
  contacts.sort((a, b) => {
    let aName = a.name.toLowerCase(),
      bName = b.name.toLowerCase();

    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  return (
    <div className="home">
      {loading ? <Loader /> : ""}

      {contacts.map((contact) => {
        return (
          <Link
            to={`/contact-details/${contact.username}`}
            key={contact.username}
            draggable="false"
          >
            <div className={Styles.contactBox}>
              <div className={Styles.name}>{contact.name}</div>
              <div className={Styles.phone}>{contact.phone.split(" ")[0]}</div>
              <div className={Styles.email}>{contact.email}</div>
              <div className={Styles.website}>{contact.website}</div>
            </div>
          </Link>
        );
      })}
      <Link to={"/create-contact"}>
        <div className={Styles.createNew}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1237/1237946.png"
            alt="+"
          />
        </div>
      </Link>
    </div>
  );
};

export default Home;
