import React, { useState, useEffect } from "react";
import {
  AllCustomers,
  GetCustomer,
  UpdateCustomer,
  DeleteCustomer,
  AddCustomer,
  AllHotels,
  GetHotel
} from "./settings";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";

function Hotels() {
 /*  const initialValues = {
    address: "",
    email: "",
    name: "",
    phone: "",
    price: "",
    url: ""
  }; */

  const [allPerson, setAllPerson] = useState([]);
 /*  const [person, setPerson] = useState(initialValues); */

  /* const handleSubmit = (event) => {
    //   alert('A name was submitted: ' + person.name);
    event.preventDefault();
    updateForm(person);
    console.log("from submit " + person);
  };

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setPerson({ ...person, [id]: value });
    console.log("from change " + id);
  };
 */
  const fetchPerson = () => {
    fetch(AllHotels)
      .then((res) => res.json())
      .then((data) => {
        setAllPerson(data);
      });
  };

  /* const deletePerson = (email) => {
    const options = makeOptions("DELETE");

    fetch(DeleteCustomer + email, options)
      .then((res) => res.json())
      .then((data) => {
        setAllPerson(data);
        fetchPerson();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  }; */

 /*  const updateForm = (person) => {
    const options = makeOptions("PUT", person);

    fetch(UpdateCustomer + person.email, options)
      .then((res) => fetchPerson())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  }; */

 /*  const getHotel = (id) => {
    fetch(GetHotel + id)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
        console.log(data);
      })
      .then((data) => {
        const hotelString = `ID: ${data.id} Name: ${data.name}`;
        document.getElementById("txt_hotel").innerHTML = hotelString;
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  }; */

/*   const addPerson = () => {
    const options = makeOptions("POST", person);

    fetch(AddCustomer, options)
      .then((res) => res.json())
      .then((res) => fetchPerson())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  }; */

/*   const showUser = document.getElementById("txt_User");
  const input = document.getElementById("inp_User").value; */
 /*  document.getElementById("btn_User").onclick = () => {
    const id = document.getElementById("inp_User").value;
    fetch(GetHotel + id)
      .then((res) => res.json())
      .then((user) => {
        const userString = `ID: ${user.id} <br /> Address: ${user.address} <br /> Email: ${user.email} <br /> Name: ${user.name} <br /> Phone: ${user.phone} <br /> Price: ${user.price} <br /> URL: ${user.url}`;
        document.getElementById("txt_User").innerHTML = userString;
      });
  }; */

  /* const userForm = () => {
    return (
      <div>
          <br />
        <h5>Search for hotel info: </h5>
        <input id="inp_User" type="text"></input>
        <button id="btn_User">Search</button>
        <p id="txt_User"></p>
      </div>
    );
  }; */

  /*
  Function for POST, PUT and DELETE
  */
 /*  function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  } */

  /* function fetchWithErrorCheck(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  } */

  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <div>
      <Container>
        <h2>List of Hotels</h2>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Price</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {allPerson.all &&
                  allPerson.all.map((element) => {
                    return (
                      <tr key={element.id}>

                        <td>{element.address}</td>
                        <td>{element.email}</td>
                        <td>{element.name}</td>
                        <td>{element.phone}</td>
                        <td>{element.price}</td>
                        <td>{element.url}</td>
                        
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
           
          </Col>
        </Row>
        <br />
        <h5>Search for hotel info: </h5>
        <input id="inp_User" type="text"></input>
        <button id="btn_User">Search</button>
        <p id="txt_User"></p>
       {/*  {userForm()} */}
      </Container>
    </div>
  );
}

export default Hotels;
