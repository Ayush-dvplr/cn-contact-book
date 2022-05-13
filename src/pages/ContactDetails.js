import { useParams } from "react-router-dom";

import { Loader, ContactCard, ContactNotFound } from "../components";
import { useState } from "react";

const ContactDetails = ({ loading, contacts, setContacts }) => {
  const [contact, setContact] = useState([]);

  let { id } = useParams();

  if (contacts.length > 0) {
    const index = contacts.findIndex((object) => {
      return object.username === id;
    });

    if (index >= 0) {
      if (contacts[index] !== contact) {
        setContact(contacts[index]);
      }
    }
  }

  return (
    <div className="contactDetails">
      {loading ? <Loader /> : ""}

      {contact.name ? (
        <ContactCard
          contact={contact}
          contacts={contacts}
          setContacts={setContacts}
        />
      ) : !loading ? (
        <ContactNotFound />
      ) : (
        ""
      )}
    </div>
  );
};

export default ContactDetails;
