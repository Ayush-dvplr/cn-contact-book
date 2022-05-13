import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components";
import {
  Home,
  _404,
  ContactDetails,
  CreateContact,
  EditContactDetails,
} from "./pages/index.js";

function App() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const wrapper = React.createRef();

  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      let request = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      });
      let data = await request.json();
      data.sort((a, b) => {
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
      setContacts(data);
      setLoading(false);
    };
    fetchContacts();
  }, []);
  return (
    <div className="App" ref={wrapper}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              contacts={contacts}
              loading={loading}
              setContacts={setContacts}
            />
          }
        />
        <Route
          path="/contact-details/:id"
          element={
            <ContactDetails
              loading={loading}
              contacts={contacts}
              setContacts={setContacts}
            />
          }
        />
        <Route
          path="/create-contact"
          element={
            <CreateContact contacts={contacts} setContacts={setContacts} />
          }
        />
        <Route
          path="/edit-contact/:id"
          element={
            <EditContactDetails
              contacts={contacts}
              setContacts={setContacts}
              loading={loading}
            />
          }
        />
        <Route path="*" element={<_404 />} />
      </Routes>
    </div>
  );
}

export default App;
