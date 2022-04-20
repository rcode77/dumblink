import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useState, React } from "react";

import logo from "../assets/logo/logo.png";
import backgroundImage from "../assets/images/bg.png";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";

const styles = {
  bgImage: {
    backgroundColor: "#E5E5E5",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  firstText: {
    fontSize: "72px",
    color: "White",
  },
  secondText: {
    fontSize: "24px",
    color: "White",
  },
  btnRegister: {
    padding: "10px 30px 10px 30px",
    borderRadius: 10,
    backgroundColor: "#FF9F00",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
  btnLogin: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    color: "black",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
  btnGetStarted: {
    padding: "10px 30px 10px 30px",
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
  },
};

function LandingPage() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const modalLogin = async (e) => {
    await setLoginModal(true);
    setRegisterModal(false);
  };

  const modalRegister = async (e) => {
    await setRegisterModal(true);
    setLoginModal(false);
  };

  return (
    <div style={styles.bgImage}>
      <Container fluid>
        <Row>
          <Col style={{ backgroundColor: "#F4F4F4", height: "76px" }}>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: 120, marginLeft: 110, marginTop: 20 }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 15,
                }}
              >
                <Col sm={2} style={{ marginRight: 36 }}>
                  <Button style={styles.btnLogin} onClick={modalLogin}>
                    Login
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button style={styles.btnRegister} onClick={modalRegister}>
                    Register
                  </Button>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Container>
          <Col md={6} style={{ marginTop: 50 }}>
            <Col style={{ fontWeight: "600" }}>
              <p style={styles.firstText}>The Only Link You’ll Ever Need</p>
            </Col>
            <p style={styles.secondText}>
              Add a link for your Social Bio and optimize your social media
              traffic.
            </p>
            <Col style={{ marginTop: 30 }}>
              <p style={styles.secondText}>safe, fast and easy to use</p>
            </Col>

            <Col sm={5} style={{ marginTop: 50 }}>
              <Button style={styles.btnGetStarted} onClick={modalRegister}>
                Get Started For Free
              </Button>
            </Col>
          </Col>
        </Container>
      </Container>
      <RegisterModal
        trigger={modalLogin}
        show={registerModal}
        onHide={() => setRegisterModal(false)}
      />
      <LoginModal
        trigger={modalRegister}
        show={loginModal}
        onHide={() => setLoginModal(false)}
      />
    </div>
  );
}

export default LandingPage;
