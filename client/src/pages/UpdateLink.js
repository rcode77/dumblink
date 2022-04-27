import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useState, useEffect } from "react";

import images from "../assets/images/upload.png";
import phone from "../assets/images/phone1.png";

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
  profile: {
    width: "200px",
    height: "200px",
    marginRight: "10px",
    marginLeft: 50,
  },
};

function UpdateLink() {
  const { id } = useParams();
  const navigate = useNavigate();

  const titlePage = "MyLink";
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    linkImage: "",
    title: "",
    description: "",
    links: [],
  });

  const getLink = async (id) => {
    try {
      const response = await API.get("/link-edit/" + id);
      setForm({
        ...form,
        title: response.data.linkData.title,
        description: response.data.linkData.description,
        links: response.data.linkData.links,
      });
      setPreview(response.data.linkData.linkImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLink(id);
  }, []);

  const addAnotherLink = (e) => {
    e.preventDefault();

    setForm({
      ...form,
      links: [...form.links, { linkTitle: "", url: "" }],
    });
  };

  const handleChange = (e, i) => {
    const newLinks = form.links;
    newLinks[i] = { ...newLinks[i], [e.target.name]: e.target.value };
    setForm({ links: newLinks });

    setForm({
      ...form,

      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
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

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("description", form.description);
      formData.set("linkImage", form.linkImage[0], form.linkImage[0].name);
      formData.set("links", JSON.stringify(form.links));

      const response = await API.patch("/link/" + id, formData, config);

      console.log(response);
      console.log(form);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Update Link Success
          </Alert>
        );
        setMessage(alert);

        new FormData();

        navigate("/my-link");
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            Update Link Failed
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
                  <p style={styles.title}>Update Link</p>
                </Col>
                <Col style={{ marginRight: 50 }}>
                  <Button style={styles.btnPublish} type="submit">
                    Update
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
                        {preview && (
                          <div className="d-flex justify-content-center">
                            <img
                              src={preview}
                              style={styles.profile}
                              alt="preview"
                            />
                          </div>
                        )}
                      </Col>
                      <Col style={{ marginLeft: 30 }}>
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
                    {form.links.map((item, index) => (
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
                              <img src={images} alt="upload" />
                            </Col>
                            <Col style={{ marginLeft: 10 }}>
                              <Col>
                                <p style={styles.inputText}>Title Link</p>
                                <Form.Group className="mb-3 border-bottom border-dark">
                                  <Form.Control
                                    type="text"
                                    // placeholder="ex. Your Title"
                                    name="linkTitle"
                                    onChange={(e) => handleChange(e, index)}
                                    style={styles.linkForm}
                                    value={item.linkTitle}
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
                                    onChange={(e) => handleChange(e, index)}
                                    style={styles.linkForm}
                                    value={item.url}
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
                    <img src={phone} alt="linklogo" />
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

export default UpdateLink;
