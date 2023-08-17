import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`).then((res) => {
      const user = {
        name: res.data[0].name,
        email: res.data[0].email,
        password: res.data[0].password,
      };
      setData(user);
      console.log(user);
    });
  }, [id]);

  const updateUser = (user) => {
    axios.patch(`http://localhost:5000/users/${id}`, user).then((res) => {
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Name: ${data.name} Email: ${data.email} Password: ${data.password}`);
    updateUser(data);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.email}</h1>
      <h1>{data.password}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Enter Name"
          onChange={handleChange}
        />
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

export default Edit;
