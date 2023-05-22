import React, { useState } from "react";
import Spell from "./Spell";
import { useDrop } from "react-dnd";
import "../App.css";

const SpellList = [
  {
    id: 1,
    path: "/spells/Spell_accelerating_shot.webp"
  },
  {
    id: 2,
    path: "/spells/Spell_accelerating_shot.webp"
  },
  {
    id: 3,
    path: "/spells/Spell_accelerating_shot.webp"
  },
]

function DragDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const spellList = SpellList.filter((spell) => id === spell.id);
    setBoard((board) => [...board, spellList[0]]);
    // setBoard([spellList[0]]); // 常に1つだけ表示する．
  };
  return (
    <>
      <div className="Pictures">
        {SpellList.map((spell) => {
          return <Spell path={spell.path} id={spell.id} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((spell) => {
          return <Spell path={spell.path} id={spell.id} />;
        })}
      </div>
    </>
  );
}
export default DragDrop;