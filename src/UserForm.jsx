// import axios from "axios";
// import { useEffect, useState } from "react";

import axios from "axios";
import { useEffect, useState } from "react";

// function UserForm() {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//   });
//   const [editingUserId, setEditingUserId] = useState(null);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingUserId) {
//         await axios.put(
//           `http://localhost:5000/users/${editingUserId}`,
//           newUser
//         );
//         setNewUser({ name: "", email: "" });
//         setEditingUserId(null);
//       } else {
//         await axios.post("http://localhost:5000/users", newUser);
//         setNewUser({ name: "", email: "" }); // Clear form
//       }
//       fetchUsers(); // Refresh list
//     } catch (err) {
//       console.error("Error adding user:", err);
//     }
//   };

//   //Handle delete
//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/users/${id}`);
//     fetchUsers();
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   const handleEdit = async (user) => {
//     setNewUser({ name: user.name, email: user.email });
//     setEditingUserId(user.id);
//   };
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>User Registration</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           value={newUser.name}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           value={newUser.email}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <button type="submit">Create User</button>
//       </form>

//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button
//                     style={{ marginRight: "10px" }}
//                     onClick={() => handleEdit(user)}
//                   >
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(user.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserForm;

function UserForm() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [isEditingId, seIsEditingId] = useState(null);

  const fetchUsers = async () => {
    let res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingId) {
        console.log("heelo");
      } else {
        await axios.post("http://localhost:5000/users", newUser);
        setUsers([...users, newUser]);
      }

      fetchUsers();
      setNewUser({ name: "", email: "" });
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async (user) => {
    setNewUser({ name: user.name, email: user.email });
    seIsEditingId(user.id);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Creating Users</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
          style={{ marginRight: "10px", marginBottom: "10px" }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          style={{ paddingRight: "10px" }}
          required
        />
        <button type="submit">create</button>
      </form>

      <table border="1" cellPadding="10px" cellSpacing="0">
        <thead>
          <th>Name</th>
          <th>Email</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={handleEdit}>Edit</button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserForm;
