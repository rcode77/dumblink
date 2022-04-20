import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import images from "../assets/images/upload.png";

import { API } from "../config/api";

export default function PreviewLink() {
  const { id } = useParams();
  const [link, setLink] = useState({});

  const getLink = async () => {
    try {
      const response = await API.get("/link/" + id);
      setLink(response.data.linkData);
      console.log(response);

      // // Configuration
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      // // Data body
      // const viewUpdate = {
      //   viewCount: link.viewCount + 1,
      // };
      // const body = JSON.stringify(viewUpdate.viewCount);

      // const update = await API.patch("/link", body, config);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(link);

  useEffect(() => {
    getLink();
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#F4F4F4" }}>
      <Row>
        <center>
          <Col md={6}>
            <Row>
              <Col>
                <img
                  src={link.linkImage}
                  alt="linkimage"
                  style={{
                    marginTop: "30px",
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    objectPosition: "middle",
                  }}
                  className="rounded-circle border-black"
                />
              </Col>
            </Row>
            <Row>
              <p className="h1 fw-bold my-3">{link.title}</p>
            </Row>
            <Row>
              <p className="mb-3 fs-4">{link.description}</p>
            </Row>
            <Col style={{ marginBottom: 100 }}>
              {link.links?.map((item) => (
                <a
                  target="_blank"
                  href={item.url}
                  style={{ textDecoration: "none" }}
                >
                  <Row
                    style={{
                      backgroundColor: "black",
                      padding: 10,
                      marginBottom: 10,
                    }}
                    key={item.linkTitle}
                  >
                    <Col md={2}>
                      <img
                        src={images}
                        alt="linkimage"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          objectPosition: "middle",
                          float: "left",
                        }}
                        className="rounded-circle border-black"
                      />
                    </Col>
                    <Col md={8} style={{ textAlign: "center", marginTop: 5 }}>
                      <p style={{ color: "white", fontSize: 24 }}>
                        {item.linkTitle}
                      </p>
                    </Col>
                  </Row>
                </a>
              ))}
            </Col>
          </Col>
        </center>
      </Row>
    </Container>
  );
}
