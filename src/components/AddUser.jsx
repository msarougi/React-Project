import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function AddUser() {
  //  مبدئياً عرّفنا القيم داخل userData عشان ما تكون undefined
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  const navigate = useNavigate();

  // Handle Add user functionality
  function handleAddUser(e) {
    e.preventDefault();
    const addUser = async () => {
      await axios.post("http://localhost:3000/users", userData);
      toast.success("User added successfully");
      navigate("/user");
    };
    addUser();
  }

  return (
    <div className="container mt-5 mx-24">
      <div>
        <form onSubmit={handleAddUser}>
          <h1>Add User</h1>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  email: e.target.value
                }))
              }
            />
          </div>

          <button type="submit" className="btn btn-primary my-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
