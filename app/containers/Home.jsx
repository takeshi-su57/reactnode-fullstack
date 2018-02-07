import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="jumbotron text-center">
      <h1>React fullstack</h1> A Single Page Application built using React and
      Nodejs
      <p>
        <NavLink to="about" className="btn btn-info">More info</NavLink>
      </p>
    </div>
  </div>
);

export default Home;
