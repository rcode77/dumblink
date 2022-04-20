import React, { useContext, useState } from "react";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { API } from "../../config/api";

const styles = {
  title: {
    marginTop: "20px",
    fontSize: "36px",
    fontWeight: "700",
  },
  btnLogin: {
    marginTop: "50px",
    width: "100%",
    height: "50px",
    backgroundColor: "#FF9F00",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
  },
  input: {
    height: "50px",
    marginTop: "30px",
    backgroundColor: "#BCBCBC40",
    border: "2px solid #BCBCBC",
  },
  text: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  link: {
    marginLeft: "5px",
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

function LoginModal(props) {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // Checking process
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        console.log(response);

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);

        navigate("/template");
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={styles.title}>Login</Form.Label>
            {message && message}
            <Form.Control
              style={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Form.Control
              style={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Button style={styles.btnLogin} type="submit">
              Login
            </Button>
            <Col style={styles.text}>
              <p>Don't have an account ? Klik</p>
              <a onClick={props.trigger} style={styles.link}>
                Here
              </a>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
