import React from 'react';

const Home = props => {
  const { appData } = props;
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">{appData.content.app_title}</h1>
        <p className="lead">{appData.content.app_description}</p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="{{'app_repo_url' | translate}}"
            target="_blank"
            rel="noopener"
            role="button"
          >
            More info
          </a>
        </p>
      </div>
      <div className="row justify-content-md-center">
        <h2 className="text-uppercase">Features</h2>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-6">
          <img className="img-fluid float-left" src="/assets/images/nodejs.png" alt="NodeJs" width="140" height="140" />
          <h2>NodeJs</h2>
          <p>Node.js® is a JavaScript runtime built on Chrome&#39;s V8 JavaScript engine.</p>
          <p className="leat">
            <a className="btn btn-secondary" target="_black" rel="noopener" href="https://nodejs.org/en/" role="button">
              View details »
            </a>
          </p>
        </div>
        <div className="col-sm-6">
          <img className="img-fluid float-left" src="/assets/images/react.png" alt="React" width="140" height="140" />
          <h2>React</h2>
          <p>A JavaScript library for building user interfaces</p>
          <p className="leat">
            <a className="btn btn-secondary" target="_black" rel="noopener" href="https://reactjs.org/" role="button">
              View details »
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
