import React, { useState } from "react";
import {useLocation} from 'react-router-dom';
import "./caloric.css";

const Caloric = () => {
  const location = useLocation();
  return (
    <>
        Caloric appeared :OO
        ${location.state.selectedRole}
        ${location.state.selectedMechanic}
    </>
  );
};

export default Caloric;