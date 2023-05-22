import { useDrag } from "react-dnd";
import React from "react";

function Spell({path, id}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={path}
      width="50px"
      style={{border: isDragging ? "5px solid pink" : "0px"}}
    />
  );
}

export default Spell;