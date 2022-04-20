import React from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";

const styles = {
  warn: {
    marginTop: 45,
    marginLeft: 40,
    textDecoration: "none",
    color: "#469F74",
    fontWeight: "400",
    fontSize: "24px",
  },
  btnYes: {
    padding: "10px 60px 10px 60px",
    borderRadius: 10,
    backgroundColor: "#FF0000",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    float: "right",
  },
  btnNo: {
    padding: "10px 60px 10px 60px",
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    float: "right",
  },
};

function DeletePopUp({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ width: "90%" }}>
        <p style={styles.warn}>You are sure you want to remove this link?</p>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 45,
          }}
        >
          <Col sm={3}>
            <Button onClick={handleDelete} style={styles.btnYes}>
              Yes
            </Button>
          </Col>
          <Col sm={3}>
            <Button onClick={handleClose} style={styles.btnNo}>
              No
            </Button>
          </Col>
        </Col>
      </Modal.Body>
    </Modal>
  );
}

export default DeletePopUp;
