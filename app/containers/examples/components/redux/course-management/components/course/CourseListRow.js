import React from 'react';
import { Link } from 'react-router-dom';

const CourseListRow = ({ course, match }) => (
  <tr>
    <td>
      <a href={course.watchHref} target="_blank">
          Watch
      </a>
    </td>
    <td>
      <Link to={`${match.url}/course/${course.id}`}>{course.title}</Link>
    </td>
    <td>{course.authorId}</td>
    <td>{course.category}</td>
    <td>{course.length}</td>
  </tr>
);

export default CourseListRow;
