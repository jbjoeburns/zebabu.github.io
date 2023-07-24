import React, { useState } from "react";
import "./homepage.css";

const Homepage = () => {
  const [selectedRole, setSelectedRole] = useState("MT");
  const [selectedMechanic, setSelectedMechanic] = useState("Caloric");
  const [roleList]  = useState(["MT", "OT", "H1", "H2", "M1", "M2", "R1", "R2"])
  const [mechanicList]  = useState(["Caloric"])

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value)
  }

  const handleChangeMechanic = (event) => {
    setSelectedMechanic(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(selectedRole)
    alert(selectedMechanic)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <legend>Select Role:</legend>
        <select value={selectedRole} onChange={handleChangeRole}>
          {
          roleList.map(role => {
            return (
            <>
            <option value={role}>{role}</option>
            </>
            )
          })}
        </select>
        <legend>Select Mechanic:</legend>
        <select value={selectedMechanic} onChange={handleChangeMechanic}>
          {
          mechanicList.map(mechanic => {
            return (
            <>
            <option value={mechanic}>{mechanic}</option>
            </>
            )
          })}
        </select>
        <br></br>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Homepage;