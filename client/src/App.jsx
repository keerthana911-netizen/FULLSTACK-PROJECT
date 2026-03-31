import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("https://fullstack-project-sfam.onrender.com/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (!name || !email) {
      alert("Enter name and email!");
      return;
    }

    await fetch("https://fullstack-project-sfam.onrender.com/add-user-manual", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");
    fetchUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch("https://fullstack-project-sfam.onrender.com/add-user-manual", {
      method: "DELETE",
    });

    fetchUsers();
  };

  // Update user
  const updateUser = async () => {
    if (!editUser) return;

    await fetch(`https://fullstack-project-sfam.onrender.com/update/${editUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setEditUser(null);
    setName("");
    setEmail("");
    fetchUsers();
  };

  return (
    <div className="container">
      <h1 className="title">My Fullstack Project 🚀</h1>

      {/* FORM */}
      <div className="form">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Add / Update button */}
        <button onClick={editUser ? updateUser : addUser}>
          {editUser ? "Update User ✏️" : "Add User"}
        </button>

        {/* Cancel button */}
        {editUser && (
          <button
            onClick={() => {
              setEditUser(null);
              setName("");
              setEmail("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel ❌
          </button>
        )}
      </div>

      <h2 className="subtitle">Users from MongoDB:</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          borderRadius: "10px",
        }}
      />

      {/* USERS LIST */}
      {users
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((user) => (
          <div className="card" key={user._id}>
            <p>
              <span className="label">Name:</span> {user.name}
            </p>

            <p>
              <span className="label">Email:</span> {user.email}
            </p>

            <button
              onClick={() => {
                setEditUser(user);
                setName(user.name);
                setEmail(user.email);
              }}
            >
              Edit ✏️
            </button>

            <button
              className="deleteBtn"
              onClick={() => deleteUser(user._id)}
            >
              Delete ❌
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;