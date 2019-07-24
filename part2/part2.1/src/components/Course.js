import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  const courseList = () =>
    courses.map(course => (
      <div key={course.id}>
        <Header header={course.name} />
        <Content parts={course.parts} />
      </div>
    ));

  return (
    <div>
      <h2>Web development curriculum</h2>
      {courseList()}
    </div>
  );
};

export default Course;
