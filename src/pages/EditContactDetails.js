import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import Styles from "./Styles/EditContactDetails.module.css";
import { Loader, ContactNotFound } from "../components";

const EditContactDetails = ({ setContacts, loading, contacts }) => {
  const [index, setIndex] = useState(-2);
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");

  //setting contacts
  useEffect(() => {
    //assing values

    if (contact) {
      if (name !== contact.name) {
        setName(contact.name);
      }
      if (phone !== contact.phone.split(" ")[0].toString()) {
        setPhone(contact.phone.split(" ")[0].toString());
      }
      if (email !== contact.email) {
        setEmail(contact.email);
      }
      if (website !== contact.website) {
        setWebsite(contact.website);
      }
      if (street !== contact.address.street) {
        setStreet(contact.address.street);
      }
      if (city !== contact.address.city) {
        setCity(contact.address.city);
      }
      if (zipcode !== contact.address.zipcode) {
        setZipcode(contact.address.zipcode);
      }
      if (companyName !== contact.company.name) {
        setCompanyName(contact.company.name);
      }
      if (companyDesc !== contact.company.bs) {
        setCompanyDesc(contact.company.bs);
      }
      if (catchPhrase !== contact.company.catchPhrase) {
        setCatchPhrase(contact.company.catchPhrase);
      }
    }
  }, [index]);

  //getting id from url
  const { id } = useParams();

  //getting contact from id

  if (contacts.length > 0) {
    let contactIndex = contacts.findIndex((object) => {
      return object.username === id;
    });
    if (index !== contactIndex) {
      setIndex(contactIndex);
    }
  }

  //Toast notification setup

  const { addToast } = useToasts();

  //set contact

  let contact = contacts[index];

  //functions for input box

  const handleChangeName = (e) => {
    let text = e;
    text = text.replace(/\s+/g, " ");
    text = text.slice(0, 25);
    setName(text);
  };

  const handleChangePhone = (e) => {
    let text = e;
    text = text.toString();
    text = text.slice(0, 15);
    setPhone(text);
  };

  const handleChangeEmail = (e) => {
    let text = e;
    text = text.trim();
    text = text.slice(0, 30);
    setEmail(text);
  };

  const handleChangeWebsite = (e) => {
    let text = e;
    text = text.trim();
    text = text.slice(0, 30);
    setWebsite(text);
  };

  const handleChangeStreet = (e) => {
    let text = e;
    text = text.replace(/\s+/g, " ");
    text = text.slice(0, 25);
    setStreet(text);
  };

  const handleChangeCity = (e) => {
    let text = e;
    text = text.replace(/\s+/g, " ");
    text = text.slice(0, 25);
    setCity(text);
  };

  const handleChangeZipcode = (e) => {
    let text = e;
    text = text.toString();
    text = text.slice(0, 15);
    setZipcode(text);
  };

  const handleChangeCompanyName = (e) => {
    let text = e;
    text = text.replace(/\s+/g, " ");
    text = text.slice(0, 25);
    setCompanyName(text);
  };

  const handleChangeCompanyDesc = (e) => {
    let text = e;
    text = text.replace(/\s+/g, " ");
    text = text.slice(0, 25);
    setCompanyDesc(text);
  };

  const handleChangeCompanyPharase = (e) => {
    let text = e;
    text = text.replace(/\s+/g, " ");
    text = text.slice(0, 25);
    setCatchPhrase(text);
  };

  //Handle edit contact function

  const handlecreateContact = () => {
    let check = 0;
    name.length >= 3
      ? check++
      : addToast("name length must be greater than 3", {
          appearance: "warning",
        });
    phone.length > 10
      ? check++
      : addToast("phone number length must be greater than 10", {
          appearance: "warning",
        });
    email.length > 10
      ? check++
      : addToast("Email length must be greater than 10", {
          appearance: "warning",
        });
    email.indexOf("@") > 0 && email.indexOf(".") > 0
      ? check++
      : addToast("Invalid Email", {
          appearance: "warning",
        });
    website.length >= 5
      ? check++
      : addToast("Website length must be greater than 5", {
          appearance: "warning",
        });
    website.indexOf(".") > 0
      ? check++
      : addToast("Invalid website", {
          appearance: "warning",
        });

    //proceed if all the cases are true

    if (check === 6) {
      const newContact = contact;
      let editContact = {
        email: email,
        id: contacts.length,
        name: name,
        phone: phone,
        website: website,
        company: {
          bs: companyDesc,
          catchPhrase: catchPhrase,
          name: companyName,
        },
        address: {
          city: city,
          street: street,
          zipcode: zipcode,
        },
      };

      //making a fetch request to update

      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          id: contact.id,
          name: name,
          phone: phone,

          website: website,
          company: {
            bs: companyDesc,
            catchPhrase: catchPhrase,
            name: companyName,
          },
          address: {
            city: city,
            street: street,
            zipcode: zipcode,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

      let editedContact = Object.assign(newContact, editContact);
      let newContacts = contacts;
      newContacts.splice(index, 1, editedContact);

      setContacts(newContacts);
      addToast("Edited sucessfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      setRedirect(true);
    }
  };

  return (
    <div className="createContact">
      {redirect ? <Navigate to={"/"} /> : ""}
      {loading ? (
        <Loader />
      ) : index < 0 ? (
        <ContactNotFound />
      ) : (
        <div className={Styles.container}>
          <div className={Styles.imageBox}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt="profile pic"
            />
          </div>
          <div className={Styles.field}>
            <div className={Styles.fieldLabel}>Name</div>
            <div className={Styles.inputBox}>
              <input
                type={"text"}
                placeholder="Name"
                value={name}
                required
                onChange={(e) => handleChangeName(e.target.value)}
              />
            </div>
          </div>

          <div className={Styles.field}>
            <div className={Styles.fieldLabel}>Phone</div>
            <div className={Styles.inputBox}>
              <input
                type={"tel"}
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => handleChangePhone(e.target.value)}
              />
            </div>
          </div>
          <div className={Styles.field}>
            <div className={Styles.fieldLabel}>Email</div>
            <div className={Styles.inputBox}>
              <input
                type={"email"}
                placeholder="Email"
                value={email}
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={Styles.field}>
            <div className={Styles.fieldLabel}>Website</div>
            <div className={Styles.inputBox}>
              <input
                type={"text"}
                placeholder="Website"
                value={website}
                onChange={(e) => handleChangeWebsite(e.target.value)}
              />
            </div>
          </div>
          <div className={Styles.field}>
            <div className={Styles.fieldLabel}>Address</div>
            <div className={Styles.inputBox}>
              <input
                type={"text"}
                placeholder="Street"
                value={street}
                onChange={(e) => handleChangeStreet(e.target.value)}
              />
              <input
                type={"text"}
                placeholder="City"
                value={city}
                onChange={(e) => handleChangeCity(e.target.value)}
              />
              <input
                type={"tel"}
                placeholder="Zipcode"
                value={zipcode}
                onChange={(e) => handleChangeZipcode(e.target.value)}
              />
            </div>
          </div>
          <div className={Styles.field}>
            <div className={Styles.fieldLabel}>Company</div>
            <div className={Styles.inputBox}>
              <input
                type={"text"}
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => handleChangeCompanyName(e.target.value)}
              />
              <textarea
                placeholder="lil description"
                onInput={(e) => handleChangeCompanyDesc(e.target.value)}
                value={companyDesc}
              ></textarea>
              <textarea
                placeholder="catch phrase"
                onInput={(e) => handleChangeCompanyPharase(e.target.value)}
                value={catchPhrase}
              ></textarea>
            </div>
          </div>
          <div className={Styles.save} onClick={handlecreateContact}>
            save
          </div>
        </div>
      )}
    </div>
  );
};

export default EditContactDetails;
