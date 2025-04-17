import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function UsersList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    const usersData = response.data;
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);




  function handleRemoveUser(userId) {
    const removeUser = async () => {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      toast.success("User deleted Successfully");
    };
    removeUser();
  }

  function handleUpdateUser(id) {
    navigate(`/user/update/${id}`);
  }

  
  function handleAddUserClick() {
    navigate("/user/add");
  }

  return (
    <div className="container mt-5 mx-24">
      <div>
        <button className="btn btn-primary mb-3" onClick={handleAddUserClick}>
          Add user
        </button>
      </div>
      {/* map on users and render them */}
      {users?.map((user) => (
        <div className="card mb-3" key={user.id}>
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">Email: {user.email}</p>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveUser(user.id)}
              >
                Remove user
              </button>
              <button
                className="btn btn-primary mx-4"
                onClick={() => handleUpdateUser(user.id)}
              >
                Edit user
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
