import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useState, useEffect } from "react";

import { API } from "../config/api";

const styles = {
  title: {
    marginTop: 15,
    marginLeft: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  btnSave: {
    padding: "10px 30px 10px 30px",
    borderRadius: 10,
    backgroundColor: "#FF9F00",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    float: "right",
  },
  btnDelete: {
    padding: "10px 30px 10px 30px",
    borderRadius: 10,
    backgroundColor: "#FF0000",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    float: "right",
  },

  form: {
    border: "none",
  },
  textArea: {
    border: "none",
    resize: "none",
  },
  linkForm: {
    border: "none",
    backgroundColor: "#E5E5E5",
  },
  inputText: {
    color: "#7E7A7A",
    fontSize: "18px",
    fontWeight: "600",
  },
};

function MyAccount() {
  //   const [dangerModal, setDangerModal] = useState(false);
  const title = "Profile";

  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
  });

  const { fullName } = form;

  const getUser = async () => {
    try {
      const response = await API.get("/user");

      console.log(response);
      setUser(response.data.data.dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(user);

      const response = await API.patch("/update-user", body, config);

      console.log(user);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Save Complete
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            Save Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col md={3} style={{ backgroundColor: "white" }}>
            <Navbar title={title} />
          </Col>

          <Col>
            <Row>
              <Col style={{ backgroundColor: "white" }}>
                <p style={styles.title}>My Account</p>
              </Col>
            </Row>
            <Row style={{ marginTop: 45, display: "flex" }}>
              <Col>
                <p style={styles.title}>My Information</p>
              </Col>
            </Row>
            <Row style={{ marginTop: 45 }}>
              <Form onSubmit={handleOnSubmit}>
                <Col
                  md={11}
                  style={{
                    backgroundColor: "white",
                    marginLeft: 30,
                    borderRadius: 10,
                    padding: 20,
                  }}
                >
                  <Row>
                    <Col>
                      <p style={styles.inputText}>Name</p>
                      <Form.Group className="mb-3 border-bottom border-dark">
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          name="fullName"
                          onChange={handleChange}
                          style={styles.form}
                          value={user.fullName}
                        />
                      </Form.Group>

                      <p style={styles.inputText}>Email</p>
                      <Form.Group className="mb-3 border-bottom border-dark">
                        <Form.Control
                          type="text"
                          placeholder="Email"
                          name="email"
                          onChange={handleChange}
                          style={styles.form}
                          value={user.email}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Row>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      marginTop: 45,
                    }}
                  >
                    {message && message}
                    <Col sm={3}>
                      <Button style={styles.btnSave} type="submit">
                        Save Account
                      </Button>
                    </Col>
                    <Col sm={3} style={{ marginRight: 20 }}>
                      <Button style={styles.btnDelete}>Delete Account</Button>
                    </Col>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyAccount;
