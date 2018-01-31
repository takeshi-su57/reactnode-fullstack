import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { Loading } from '../../../../../../components';
import store from '../../../../../../store';

import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage';

import { loadCourses } from '../actions/courseActions';
import { loadAuthors } from '../actions/authorActions';
class CourseManagement extends React.Component {
  componentDidMount() {
    store.dispatch(loadCourses());
    store.dispatch(loadAuthors());
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.loading && <Loading />}
        {this.props.children}

        <div>
          <Route
            exact
            path={`${this.props.match.url}`}
            component={CoursesPage}
          />
          <Route
            exact
            path={`${this.props.match.url}/course`}
            component={ManageCoursePage}
          />
          <Route
            exact
            path={`${this.props.match.url}/course/:id`}
            component={ManageCoursePage}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

CourseManagement = connect(mapStateToProps)(CourseManagement);

export { CourseManagement };
