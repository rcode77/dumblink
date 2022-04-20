const express = require("express");

const router = express.Router();

// Controllers
const { register, login, checkAuth } = require("../controllers/auth");
const { getUser, updateUser } = require("../controllers/user");
const {
  addLink,
  getLinks,
  getLink,
  deleteLink,
  updateLink,
} = require("../controllers/link");
// const {
//   addTransaction,
//   getTransactions,
//   updateTransaction,
//   cancelTransaction,
//   getTransaction,
// } = require("../controllers/transaction");
// const { addMyList, getMyLists, myBook } = require("../controllers/mylist");

//Middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile, uploadImage } = require("../middlewares/uploadFile");

// Routes
router.post("/register", register);
router.post("/login", login);
// router.post("/adminregister", adminRegister);
router.get("/check-auth", auth, checkAuth);

router.get("/user", auth, getUser);
router.patch("/update-user", auth, updateUser);

router.post("/link", auth, uploadImage("linkImage"), addLink);
router.get("/links", auth, getLinks);
router.get("/link/:id", auth, getLink);
router.delete("/link/:id", auth, deleteLink);
router.patch("/link", auth, uploadImage("linkImage"), updateLink);

// router.post("/transaction", auth, uploadImage("transferProof"), addTransaction);
// router.get("/transaction/:id", getTransaction);
// router.patch("/transaction/:id", auth, updateTransaction);
// router.patch("/cancel/:id", auth, cancelTransaction);

// router.post("/add-my-list/:id", auth, addMyList);
// router.get("/my-lists", auth, getMyLists);
// router.get("/my-book/:id", auth, myBook);

module.exports = router;
