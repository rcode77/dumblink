import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";

import logo from "../assets/logo/logo.png";
import template from "../assets/logo/template.png";
import templateActive from "../assets/logo/template2.png";
import profile from "../assets/logo/profile.png";
import profileActive from "../assets/logo/profile2.png";
import myLink from "../assets/logo/mylink.png";
import myLinkActive from "../assets/logo/mylink2.png";
import logoutIcon from "../assets/logo/logout.png";

const styles = {
  pName: {
    marginTop: "20px",
    fontSize: "24px",
    fontWeight: "700",
  },
  navList: {
    display: "flex",
    alignItems: "center",
  },
  navName: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#000000",
    fontSize: "25px",
    fontWeight: "400",
    cursor: "pointer",
  },
  navActive: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#FF9F00",
    fontSize: "25px",
    fontWeight: "400",
  },
  navIcon: {
    marginLeft: 50,
  },
};

export default function Navbar(props) {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <Col>
      <center>
        <Link to="/template">
          <img src={logo} alt="logo" style={{ marginTop: "24px" }} />
        </Link>

        <ul style={{ listStyleType: "none" }}>
          <Row style={{ marginTop: "84px" }}>
            <li style={styles.navList}>
              <img
                src={props?.title === "Template" ? templateActive : template}
                alt="template"
                style={styles.navIcon}
              />
              <Link
                to="/template"
                style={
                  props?.title === "Template"
                    ? styles.navActive
                    : styles.navName
                }
              >
                Template
              </Link>
            </li>
          </Row>
          <Row style={{ marginTop: "64px" }}>
            <li style={styles.navList}>
              <img
                src={props?.title === "Profile" ? profileActive : profile}
                alt="profile"
                style={styles.navIcon}
              />
              <Link
                to="/profile"
                style={
                  props?.title === "Profile" ? styles.navActive : styles.navName
                }
              >
                Profile
              </Link>
            </li>
          </Row>
          <Row style={{ marginTop: "64px", marginBottom: "80px" }}>
            <li style={styles.navList}>
              <img
                src={props?.title === "MyLink" ? myLinkActive : myLink}
                alt="mylink"
                style={styles.navIcon}
              />
              <Link
                to="/my-link"
                style={
                  props?.title === "MyLink" ? styles.navActive : styles.navName
                }
              >
                My Link
              </Link>
            </li>
          </Row>
        </ul>
        <ul style={{ listStyleType: "none" }}>
          <Row style={{ marginTop: "200px", marginBottom: 40 }}>
            <li style={styles.navList}>
              <img src={logoutIcon} alt="logout" style={styles.navIcon} />
              <a onClick={logout} style={styles.navName}>
                Logout
              </a>
            </li>
          </Row>
        </ul>
      </center>
    </Col>
  );
}
