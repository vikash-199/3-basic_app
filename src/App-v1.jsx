import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data:", formData);
    setFormData({ name: "", email: "", phone: "" });
    setIsSubmitted(true);
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {isSubmitted && <p>Form Submitted</p>}
      </form>
    </div>
  );
}

export default App;
