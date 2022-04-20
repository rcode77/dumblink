import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import AddLink from "./pages/AddLink";
import LandingPage from "./pages/LandingPage";
import MyAccount from "./pages/MyAccount";
import MyLink from "./pages/MyLink";
import PreviewLink from "./pages/PreviewLink";
import Template from "./pages/Template";

import { UserContext } from "./context/UserContext";

// Get API config & setAuthToken here ...
import { API, setAuthToken } from "./config/api";
import UpdateLink from "./pages/UpdateLink";

// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    if (!state.isLogin) {
      navigate("/");
    } else {
      //   if (state.user.role === "user") {
      //     navigate("/template");
      //   }
      navigate("/template");
    }
  }, [state]);

  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      return dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Call function check user with useEffect didMount here ...
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/template" element={<Template />} />
      <Route exact path="/add-link" element={<AddLink />} />
      <Route exact path="/update-link/:id" element={<UpdateLink />} />
      <Route exact path="/profile" element={<MyAccount />} />
      <Route exact path="/preview-link/:id" element={<PreviewLink />} />
      <Route exact path="/my-link" element={<MyLink />} />
    </Routes>
  );
}

export default App;
