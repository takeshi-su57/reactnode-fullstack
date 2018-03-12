import React from 'react';
import { connect } from 'react-redux';

const Home = (props) => {
  const { appData } = props;
  return (
    <div className="row">
      <div className="column">
        <h1>{appData.content.app_title}</h1> {appData.content.app_description}
        <div>
          <a href={appData.content.app_repo_url} target="_blank" rel="noopener" className="button button-outline float-right">More info</a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appData: state.appData,
});

export default connect(mapStateToProps)(Home);
