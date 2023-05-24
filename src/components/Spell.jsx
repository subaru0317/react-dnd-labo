import { useDrag } from "react-dnd";
import React from "react";
import { Image } from '@chakra-ui/react';

function Spell({id, name, path}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id, name: name, path: path},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    // <img
    //   ref={drag}
    //   src={path}
    //   width="50px"
    //   style={{border: isDragging ? "5px solid pink" : "0px"}}
    // />
    <Image
      ref={drag}
      boxSize="50px"
      bg="#4f4f4f"
      _hover={{ bg: "gray.900" }}
      border="2px solid #931527"
      src={path}
      alt={name}
      style={{ borderRadius: '2px' }}
    />
  );
}

export default Spell;
