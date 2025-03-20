import React from 'react';
import { Link } from 'react-router-dom';
import calculatorImage from '../assets/calculator.jpg';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Budget App</h1>
      <p>Take control of your finances and achieve your financial goals with ease.</p>
      <img src={calculatorImage} alt="Calculator" className="home-image" />
      <div className="home-buttons">
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;