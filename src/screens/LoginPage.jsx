import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { TiKeyOutline } from "react-icons/ti";
import { IoMdPerson } from "react-icons/io";

import { TextInput } from "../components/TextInput";
import { BaseUrl } from "../BaseUrl";
import useToken from "../hooks/useToken";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const { setToken } = useToken();

  const handleSubmit = async () => {
    if (!email || !pass) return alert("Please fill all details.");

    if (signUp && !name) return alert("Please enter your full name.");

    if (signUp) {
      const res = await axios
        .post(`${BaseUrl}/auth/signup`, {
          email,
          password: pass,
          fullname: name,
        })
        .catch((err) => {
          console.log(err);
          return alert(err.response.data.message);
        });
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return navigate("/puzzle");
    } else {
      const res = await axios
        .post(`${BaseUrl}/auth/login`, {
          email,
          password: pass,
        })
        .catch((err) => {
          console.log(err);
          return alert(err.response.data.message);
        });
      if (res.data.access && res.data.access === "admin_access") {
        localStorage.setItem("isAdmin", JSON.stringify(true));
        localStorage.setItem("adminPass", JSON.stringify(pass));
        // console.log(pass);
        return navigate("/dashboard", { state: { adminPass: pass } });
      }
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return navigate("/puzzle");
    }
  };

  return (
    <div className="login-page">
      <div className="form-page">
        <div className="logo-head">
          <img
            className="logo"
            src={require("../assets/Logo.png")}
            alt="logo"
          />
          <h1>Word Tress</h1>
        </div>

        <p className="useEmail">Use your Email-id to login</p>

        <div className="form">
          {signUp && (
            <TextInput
              type="name"
              onChange={(e) => setName(e.target.value)}
              placeholder={"Full Name"}
              icon={<IoMdPerson size={28} className="icon" />}
            />
          )}
          <TextInput
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email"}
            icon={<HiOutlineMail size={28} className="icon" />}
          />
          <TextInput
            type="password"
            onChange={(e) => setPass(e.target.value)}
            placeholder={"Password"}
            icon={<TiKeyOutline size={28} className="icon" />}
          />
          <button className="signin-button" onClick={handleSubmit}>
            {signUp ? "Sign Up" : "Login"}
          </button>
        </div>
        <p className="signup-or-login">
          {signUp ? "Already a user?" : "Not already signed up?"}{" "}
          <span onClick={() => setSignUp(!signUp)}>
            {signUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
