import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      Yerrr Landing Page
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};
