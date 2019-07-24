import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const partlist = () =>
    parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ));

  return (
    <div>
      <ul>{partlist()}</ul>
      <Total parts={parts}/>
    </div>
  );
};

export default Content;
