import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import templateData from "../fakeData/templateData";
import DeletePopUp from "../components/DeletePopUp";

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
  allLinks: {
    backgroundColor: "#FF9F00",
    width: 30,
    fontSize: 18,
    textAlign: "center",
    color: "white",
    marginTop: 15,
    borderRadius: 15,
  },
  form: {
    border: "none",
    backgroundColor: "#E5E5E5",
  },
  textArea: {
    border: "none",
    resize: "none",
  },
  linkForm: {
    border: "none",
    backgroundColor: "#E5E5E5",
  },
  text: {
    color: "black",
    fontSize: "24px",
    fontWeight: "600",
  },
  subText: {
    color: "#7E7A7A",
    fontSize: "18px",
    fontWeight: "600",
  },
};

function MyLink() {
  const title = "MyLink";
  const [state, dispatch] = useContext(UserContext);

  // Create variabel for id product and confirm delete data with useState here ...
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create init useState & function for handle show-hide modal confirm here ...
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [links, setLinks] = useState([]);

  // Create function get links data from database here ...
  const getLinks = async () => {
    try {
      const response = await API.get("/links");
      setLinks(response.data.links);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Create function handle get id product & show modal confirm delete data here ...
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = async (id) => {
    try {
      await API.delete(`/link/${id}`);
      getLinks();
    } catch (error) {
      console.log(error);
    }
  };

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  // Call function get books with useEffect didMount here ...
  useEffect(() => {
    getLinks();
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
                <p style={styles.title}>My Links</p>
              </Col>
            </Row>
            <Row
              style={{ marginTop: 45, display: "flex", alignItems: "center" }}
            >
              <Col md={2}>
                <p style={styles.title}>All Links</p>
              </Col>
              <Col md={1}>
                <p style={styles.allLinks}>{links.length}</p>
              </Col>
              <Col md={6}>
                <Form.Group className="border-bottom border-dark">
                  <InputGroup>
                    <InputGroup.Text
                      style={{ backgroundColor: "#E5E5E5", border: "none" }}
                    >
                      <FontAwesomeIcon
                        style={{ color: "#7E7A7A" }}
                        icon={faSearch}
                      />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Find your link"
                      name="search"
                      // onChange={handleChange}
                      style={styles.form}
                      // value={isbn}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col style={{ marginRight: 50 }}>
                <Button style={styles.btnSave}>Search</Button>
              </Col>
            </Row>

            {links?.map((item) => (
              <Row style={{ marginTop: 45 }}>
                {item.idUser === state.user.id ? (
                  <Col
                    md={11}
                    style={{
                      marginLeft: 30,
                      borderRadius: 10,
                      padding: 20,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col md={5}>
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col md={4}>
                          <img
                            src={item.linkImage}
                            alt="link"
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              objectPosition: "middle",
                            }}
                          />
                        </Col>
                        <Col style={{ marginLeft: 10 }}>
                          <p style={styles.text}>{item.title}</p>
                          <p style={styles.subText}>
                            {"localhost:3000/preview-link/" + item.uniqueLink}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3}>
                      <Row>
                        <center>
                          <Col>
                            <p style={styles.text}>{item.viewCount}</p>
                            <p style={styles.subText}>visit</p>
                          </Col>
                        </center>
                      </Row>
                    </Col>
                    <Col style={{ marginLeft: 50 }}>
                      <Row>
                        <Col>
                          <Link to={"/preview-link/" + item.uniqueLink}>
                            <Button
                              style={{
                                backgroundColor: "#E5E5E5",
                                borderColor: "#7E7A7A",
                              }}
                            >
                              <FontAwesomeIcon
                                style={{ color: "#7E7A7A" }}
                                icon={faEye}
                              />
                            </Button>
                          </Link>
                        </Col>
                        <Col>
                          <Link to={"/update-link/" + item.uniqueLink}>
                            <Button
                              style={{
                                backgroundColor: "#E5E5E5",
                                borderColor: "#7E7A7A",
                              }}
                            >
                              <FontAwesomeIcon
                                style={{ color: "#7E7A7A" }}
                                icon={faEdit}
                              />
                            </Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            style={{
                              backgroundColor: "#E5E5E5",
                              borderColor: "#7E7A7A",
                            }}
                          >
                            <FontAwesomeIcon
                              style={{ color: "#7E7A7A" }}
                              icon={faTrash}
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            ))}
          </Col>
          <DeletePopUp
            setConfirmDelete={setConfirmDelete}
            show={show}
            handleClose={handleClose}
          />
        </Row>
      </Container>
    </div>
  );
}

export default MyLink;
