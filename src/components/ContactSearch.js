import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const ContactSearch = () => {
  const [contacts, setContacts] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/contacts.json")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [contacts, searchFilters]);

  const applyFilters = () => {
    const filters = Object.keys(searchFilters).filter(
      (key) => searchFilters[key].trim() !== ""
    );

    const filtered = contacts.filter((contact) =>
      filters.every((key) =>
        String(contact[key] || contact.address?.[key] || "")
          .toLowerCase()
          .includes(searchFilters[key].toLowerCase())
      )
    );

    setFilteredContacts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedContacts = filteredContacts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
        <div className="row">
      <div className="mb-4 col-lg-6">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="date"
          name="dob"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        </div>
        <div className="mb-4 col-lg-6">
        <input
          type="text"
          name="street"
          placeholder="Address"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          onChange={handleSearchChange}
          className="form-control mb-2"
        />
      </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {displayedContacts.map((contact) => (
            <tr
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              style={{ cursor: "pointer" }}
            >
              <td>
                {contact.firstName} {contact.lastName}
              </td>
              <td>{contact.dob}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address.street}</td>
              <td>{contact.address.city}</td>
              <td>{contact.address.state}</td>
              <td>{contact.address.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        pageCount={Math.ceil(filteredContacts.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />

      {selectedContact && (
        <div className="mt-4">
          <h5>Selected Contact</h5>
          <p>Name: {selectedContact.firstName} {selectedContact.lastName}</p>
          <p>Email: {selectedContact.email}</p>
          <p>Phone: {selectedContact.phone}</p>
          <p>Address: {selectedContact.address.street}</p>
          <p>City: {selectedContact.address.city}</p>
          <p>State: {selectedContact.address.state}</p>
          <p>Zip: {selectedContact.address.zip}</p>
        </div>
      )}
    </div>
  );
};

export default ContactSearch;
