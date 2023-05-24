import { useDrag, useDrop } from "react-dnd";
import React, { useRef } from "react";
import { Image } from '@chakra-ui/react';

function Spell({ spell, index, onSortEnd }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: spell.id, name: spell.name, path: spell.path, index},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ handlerId }, drop] = useDrop({
    accept: "image",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onSortEnd(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <Image
      ref={ref}
      boxSize="50px"
      bg="#4f4f4f"
      _hover={{ bg: "gray.900" }}
      border="2px solid #931527"
      src={spell.path}
      alt={spell.name}
      style={{ borderRadius: '2px' }}
    />
  );
}

export default Spell;
