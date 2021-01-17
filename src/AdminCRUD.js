import React, { useState, useEffect } from "react";
import { AllCustomers, GetCustomer, UpdateCustomer, DeleteCustomer, AddCustomer } from "./settings";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form
} from "react-bootstrap";

function AdminCrud() {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    phone: ""
  };

  const [allPerson, setAllPerson] = useState([]);
  const [person, setPerson] = useState(initialValues);

  const handleSubmit = (event) => {
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

  const fetchPerson = () => {
    fetch(AllCustomers)
      .then((res) => res.json())
      .then((data) => {
        setAllPerson(data);
      });
  };

  const deletePerson = (email) => {
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
  };

  const updateForm = (person) => {
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
  };

  const getPerson = (email) => {
    fetch(GetCustomer + email)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
        console.log(data);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const addPerson = () => {
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
  };

  const userForm = () => {
    return (
      <div>
        
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={person.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={person.name}
              onChange={handleChange}
            />
          </Form.Group>          
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              value={person.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              value={person.phone}
              onChange={handleChange}
            />
          </Form.Group>
          

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
        <p>{JSON.stringify(person)}</p>
      </div>
    );
  };

  /*
  Function for POST, PUT and DELETE
  */
  function makeOptions(method, body) {
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
  }

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
        <h2>CRUD for Hotel</h2>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th colSpan="2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {allPerson.all &&
                  allPerson.all.map((element) => {
                    return (
                      <tr key={element.email}>
                        <td>{element.email}</td>
                        <td>{element.name}</td>
                        <td>{element.password}</td>
                        <td>{element.phone}</td>
                        <td>
                          <Button onClick={() => getPerson(element.email)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => deletePerson(element.email)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Button onClick={() => addPerson()}>Add</Button>
          </Col>
        </Row>

        {userForm()}
      </Container>
    </div>
  );
}

export default AdminCrud;
