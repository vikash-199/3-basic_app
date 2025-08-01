import axios from "axios";
import { useEffect, useState } from "react";

function Table() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
