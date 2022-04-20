import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { useContext, useState, useEffect } from "react";

// import banner from "./../assets/Frame1.png";

// import Navbar from "../components/navbar/Navbar";
// import DangerPopUp from "../components/popup/DangerPopUp";
// import ListBook from "../components/ListBook";

// import { API } from "../config/api";
// import { UserContext } from "../context/UserContext";
import templateData from "../fakeData/templateData";

const styles = {
  pName: {
    marginTop: "20px",
    fontSize: "24px",
    fontWeight: "700",
  },
  pStat: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "700",
    color: "red",
  },
  navList: {
    display: "flex",
    alignItems: "center",
  },
  navName: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#929292",
    fontSize: "25px",
    fontWeight: "400",
    cursor: "pointer",
  },
  navIcon: {
    fontSize: "25px",
    color: "#929292",
  },
  listBook: {
    marginTop: 15,
    marginLeft: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

function Template() {
  //   const [dangerModal, setDangerModal] = useState(false);
  const title = "Template";

  //   const [books, setBooks] = useState([]);
  //   const [state] = useContext(UserContext);

  //   // Create function get books data from database here ...
  //   const getBooks = async () => {
  //     try {
  //       const response = await API.get("/books");
  //       setBooks(response.data.books);

  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   // Call function get books with useEffect didMount here ...
  //   useEffect(() => {
  //     getBooks();
  //   }, []);

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
                <p style={styles.listBook}>{title}</p>
              </Col>
            </Row>
            <Row style={{ marginTop: 50, overflow: "hidden" }}>
              {templateData?.map((item) => (
                <Col md={3} key={item.id}>
                  <Link to="/add-link">
                    <img src={item.image} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Template;
