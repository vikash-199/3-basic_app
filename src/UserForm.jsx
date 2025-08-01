import axios from "axios";
import { useEffect, useState } from "react";

function UserForm() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      if (editingUserId) {
        await axios.put(
          `http://localhost:5000/users/${editingUserId}`,
          newUser
        );
        setEditingUserId(null);
      } else {
        await axios.post("http://localhost:5000/users", newUser);
      }
      fetchUser();
      setNewUser({ name: "", email: "" });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (user) => {
    setNewUser({ name: user.name, email: user.email });
    setEditingUserId(user.id);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingUserId ? "edit user" : "create user"}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>edit</button>
                <button onClick={() => handleDelete(user.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserForm;
