import React from "react";

import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./screens/LoginPage";
import StartPage from "./screens/StartPage";
import AdminPage from "./screens/AdminPage";
import useToken from "./hooks/useToken";
import ResultPage from "./screens/ResultPage";

import "./styles/Login.scss";
import "./styles/TextInput.scss";
import "./styles/Start.scss";
import "./styles/PuzzlePage.scss";
import "./styles/riddleone.scss";
import "./styles/Linkquiz.scss";
import "./styles/sentence.scss";
import "./styles/Admin.scss";
import "./styles/Result.scss";

function App() {
  const { token } = useToken();
  let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  return (
    <Router>
      <Routes>
        {!token && !isAdmin && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        )}
        <Route path="/puzzle" element={<StartPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/dashboard" element={<AdminPage />} />
        <Route
          path="*"
          element={<Navigate to={!isAdmin ? "/puzzle" : "/dashboard"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
