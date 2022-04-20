import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useState, useEffect } from "react";

import { API } from "../config/api";
// import { UserContext } from "../context/UserContext";

const styles = {
  title: {
    marginTop: 15,
    marginLeft: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  btnPublish: {
    padding: "10px 30px 10px 30px",
    borderRadius: 10,
    backgroundColor: "#FF9F00",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    float: "right",
  },
  btnAdd: {
    padding: "10px 30px 10px 30px",
    borderRadius: 10,
    backgroundColor: "#FF9F00",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    width: "97%",
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
  fileInput: {
    backgroundColor: "#FF9F00",
    borderRadius: 10,
    padding: "10px 30px 10px 30px",
    cursor: "pointer",
    display: "flex",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    width: "40%",
    justifyContent: "center",
  },
};

function AddLink() {
  const titlePage = "Template";
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    linkImage: "",
    title: "",
    description: "",
    links: [
      // {
      //   linkTitle: "",
      //   url: "",
      // },
      // {
      //   linkTitle: "",
      //   url: "",
      // },
    ],
  });

  // const { title, description, links } = form;

  const addAnotherLink = (e) => {
    e.preventDefault();

    const data = {
      linkTitle: "",
      url: "",
    };

    setForm({
      links: [...form.links, { data }],
    });
  };

  const linkChange = (e, i) => {
    const newLinks = form.links;
    newLinks[i] = { [e.target.name]: e.target.value, ...newLinks[i] };
    setForm({ links: newLinks });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file" && e.target.name === "cover") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // const linksData = JSON.parse(form.links);

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("description", form.description);
      formData.set("linkImage", form.linkImage[0], form.linkImage[0].name);

      // const {linkTitle, url} = form.links
      // const linksData = {linkTitle, url}
      formData.set("links", form.title);

      const response = await API.post("/link", formData, config);

      console.log(response);
      console.log(form);

      // setForm({
      //   title: "",
      //   description: "",
      //   links: [
      //     {
      //       linkTitle: "",
      //       url: "",
      //     },
      //     {
      //       linkTitle: "",
      //       url: "",
      //     },
      //   ],
      // });

      setPreview(null);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Add Link Success
          </Alert>
        );
        setMessage(alert);

        new FormData();
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            Add Link Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <Container fluid>
        <Row>
          <Col md={3} style={{ backgroundColor: "white" }}>
            <Navbar title={titlePage} />
          </Col>

          <Col>
            <Form onSubmit={handleOnSubmit}>
              <Row>
                <Col style={{ backgroundColor: "white" }}>
                  <p style={styles.title}>{titlePage}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: 45, display: "flex" }}>
                <Col>
                  <p style={styles.title}>Create Link</p>
                </Col>
                <Col style={{ marginRight: 50 }}>
                  <Button style={styles.btnPublish} type="submit">
                    Publish
                  </Button>
                  {message && message}
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col
                  md={7}
                  style={{
                    backgroundColor: "white",
                    height: 420,
                    marginLeft: 30,
                    borderRadius: 10,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      overflowY: "scroll",
                      height: 380,
                    }}
                  >
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <Col md={4}>
                        <img src="assets/images/upload.png" alt="upload" />
                      </Col>
                      <Col>
                        <Form.Group className="form-group">
                          <Form.Control
                            id="input-file"
                            className="input-file"
                            type="file"
                            hidden
                            name="linkImage"
                            onChange={handleChange}
                          />
                          <Form.Label
                            htmlFor="input-file"
                            style={styles.fileInput}
                          >
                            <span className="me-2">Upload</span>
                          </Form.Label>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ marginTop: 40 }}>
                        <p style={styles.inputText}>Title</p>

                        <Form.Group className="mb-3 border-bottom border-dark">
                          <Form.Control
                            type="text"
                            placeholder="ex. Your Title"
                            name="title"
                            onChange={handleChange}
                            style={styles.form}
                            value={form.title}
                          />
                        </Form.Group>

                        <p style={styles.inputText}>Description</p>
                        <Form.Group className="mb-3 border-bottom border-dark">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            style={styles.textArea}
                            placeholder="ex. Description Here"
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {form.links.map((item, i) => (
                      <Row style={{ marginTop: 30 }}>
                        <Col
                          style={{
                            backgroundColor: "#E5E5E5",
                            height: 220,
                            borderRadius: 20,
                            padding: "20px 30px 20px 30px",
                          }}
                        >
                          <Row>
                            <Col md={3}>
                              <img
                                src="assets/images/upload.png"
                                alt="upload"
                              />
                            </Col>
                            <Col style={{ marginLeft: 10 }}>
                              <Col>
                                <p style={styles.inputText}>Title Link</p>
                                <Form.Group className="mb-3 border-bottom border-dark">
                                  <Form.Control
                                    type="text"
                                    // placeholder="ex. Your Title"
                                    name="linkTitle"
                                    onChange={(e) => linkChange(e, i)}
                                    style={styles.linkForm}
                                    // value={item.linkTitle}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <p style={styles.inputText}>Link</p>
                                <Form.Group className="mb-3 border-bottom border-dark">
                                  <Form.Control
                                    type="text"
                                    // placeholder="ex. Your Title"
                                    name="url"
                                    onChange={(e) => linkChange(e, i)}
                                    style={styles.linkForm}
                                    // value={item.url}
                                  />
                                </Form.Group>
                              </Col>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}

                    <Row style={{ marginTop: 50 }}>
                      <center>
                        <Button style={styles.btnAdd} onClick={addAnotherLink}>
                          Add New Link
                        </Button>
                      </center>
                    </Row>
                  </div>
                </Col>
                <Col style={{ marginTop: 10 }}>
                  <center>
                    <img src="assets/images/phone1.png" alt="linklogo" />
                  </center>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddLink;
