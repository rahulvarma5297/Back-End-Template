import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  };

  const addUser = (user) => {
    axios.post("http://localhost:5000/users", user).then((res) => {
      setUsers([...users, res.data]);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Name: ${data.name} Email: ${data.email} Password: ${data.password}`);
    addUser(data);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Registration Form</h1>

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

      {users && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => {
                      axios
                        .delete(`http://localhost:5000/users/${user._id}`)
                        .then((res) => {
                          setUsers(
                            users.filter((user) => user._id !== res.data._id)
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
