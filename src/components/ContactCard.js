import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import Styles from "./styles/ContactCard.module.css";

const ContactCard = ({ contact, contacts, setContacts }) => {
  const [redirect, setRedirect] = useState(false);
  const { addToast } = useToasts();
  const handleDelete = () => {
    let index = contacts.indexOf(contact);
    contacts.splice(index, 1);
    setContacts(contacts);

    //making a request for deleting  a contact

    fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
      method: "DELETE",
    });

    setRedirect(true);
    addToast("Deleted sucessfully !", {
      appearance: "success",
      autoDismiss: true,
    });
  };
  return (
    <div className={Styles.container}>
      {redirect ? <Navigate to="/" /> : ""}
      <div className={Styles.imageBox}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
          alt="profile image"
        />
      </div>
      <div
        className={"nameBox" + " " + Styles.contentBox}
        style={{ backgroundColor: "white" }}
      >
        {contact.name ? <div className={Styles.name}>{contact.name}</div> : ""}
      </div>
      {contact.username ? (
        <div className={"usernameBox" + " " + Styles.contentBox}>
          <div className={Styles.label}>Username</div>
          <div className={Styles.labelValue}>{contact.username}</div>
        </div>
      ) : (
        ""
      )}
      {contact.phone ? (
        <div className={"phoneBox" + " " + Styles.contentBox}>
          <div className={Styles.label}>Phone</div>
          <div className={Styles.labelValue}>{contact.phone.split(" ")[0]}</div>
        </div>
      ) : (
        ""
      )}
      {contact.email ? (
        <div className={"emailBox" + " " + Styles.contentBox}>
          <div className={Styles.label}>Email</div>
          <div className={Styles.labelValue}>{contact.email}</div>
        </div>
      ) : (
        ""
      )}
      {contact.website ? (
        <div className={"websiteBox" + " " + Styles.contentBox}>
          <div className={Styles.label}>Website</div>
          <div className={Styles.labelValue}>{contact.website}</div>
        </div>
      ) : (
        ""
      )}
      {contact.address ? (
        <div className={"addressBox" + " " + Styles.contentBox}>
          <div className={Styles.label}>Address</div>
          <div className={Styles.labelValue}>
            <div>{contact.address.street}</div>
            <div>{contact.address.city}</div>
            <div>{contact.address.zipcode}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      {contact.company ? (
        <div className={Styles.contentBox}>
          <div className={Styles.label}>Company</div>
          <div className={Styles.companyBox + " " + Styles.labelValue}>
            <div className={Styles.companyName}>{contact.company.name}</div>
            <div>{contact.company.bs}</div>
            <div>{contact.company.catchPhrase}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={Styles.delete} onClick={handleDelete}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
          alt="delete"
        />
      </div>
      <Link to={`/edit-contact/${contact.username}`}>
        <div className={Styles.edit}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
            alt="edit"
          />
        </div>
      </Link>
    </div>
  );
};

export default ContactCard;
