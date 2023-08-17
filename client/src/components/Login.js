import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/users/login", data).then((res) => {
      if (res.data.message === "Login successful") {
        alert("Login successful");
        navigate("/");
      } else {
        alert("Login failed");
        navigate("/register");
      }
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Enter Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit" style={{ cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
