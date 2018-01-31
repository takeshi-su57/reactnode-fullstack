import React from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({ courses, match }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => (
        <CourseListRow key={course.id} course={course} match={match} />
      ))}
    </tbody>
  </table>
);

export default CourseList;
