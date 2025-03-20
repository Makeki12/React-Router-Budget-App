// filepath: src/components/Intro.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import illustration from '../assets/illustration.jpg';

const Intro = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    if (userName) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;