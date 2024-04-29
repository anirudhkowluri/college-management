import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
function Home() {
  return (
    <div className="HOME">

      <Link to="/login">Login</Link>
      <img src='https://sreyas.ac.in/wp-content/uploads/2022/03/sreyas-college-logo-.png' className="IMG"/>
    </div>
  );
}

export default Home;
