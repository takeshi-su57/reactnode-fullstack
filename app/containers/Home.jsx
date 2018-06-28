import React from 'react';

const Home = props => {
  const { appData } = props;
  return (
    <div className="row">
      <div className="column">
        <h1>{appData.content.app_title}</h1> {appData.content.app_description}
        <div>
          <a
            href={appData.content.app_repo_url}
            target="_blank"
            rel="noopener"
            className="button button-outline float-right"
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
