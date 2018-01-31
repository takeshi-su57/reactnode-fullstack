import React from 'react';

const Home = () => (
  <div>
    <div className="jumbotron">
      <h1>React fullstack</h1> A Single Page Application built using React and
      Nodejs
    </div>
    <div className="row">
      <div className="col-md-6">
        <h4>React</h4>
        <p>A JavaScript library for building user interfaces</p>
        <p>
          <a className="btn btn-info" href="https://reactjs.org/">
            More info »
          </a>
        </p>
      </div>
      <div className="col-md-6">
        <h4>NodeJs</h4>
        <p>
          Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript
          engine
        </p>
        <p>
          <a className="btn btn-info" href="https://nodejs.org/en/">
            More info »
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Home;
