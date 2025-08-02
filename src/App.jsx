import Table from "./Table";
import UserForm from "./UserForm";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // vertical center
        alignItems: "center", // horizontal center
        gap: "20px",
        padding: "20px",
      }}
    >
      <UserForm />
    </div>
  );
}

export default App;
