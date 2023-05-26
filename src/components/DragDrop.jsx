import React, { useState, useCallback } from "react";
import Spell from "./Spell";
import { useDrop } from "react-dnd";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";

// list to listのための関数なのでたぶん不要
// const move = (src, dst, droppableSrc, droppableDst) => {
//   const srcClone = Array.from(src);
//   const dstClone = Array.from(dst);
//   const [removed] = srcClone.splice(droppableSrc.index, 1);

//   dstClone.splice(droppableDst.index, 0, removed);

//   const result = {};
//   result[droppableSrc.droppableId] = srcClone;
//   result[droppableDst.droppableId] = dstClone;

//   return result;
// }


const SpellList = [
  {
    id: 1,
    name: "accelerating_shot",
    path: "/spells/Spell_accelerating_shot.webp"
  },
  {
    id: 2,
    name: "worm_rain",
    path: "/spells/Spell_worm_rain.webp"
  },
  {
    id: 3,
    name: "x_ray",
    path: "/spells/Spell_x_ray.webp"
  },
]

function DragDrop() {
  const [boarditems, setBoard] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    // item はドロップされたアイテムの情報
    // 詳しくはSpellのitem情報のものが来る
    drop: (item) => {
      // IDがSpellListのものと一致する場合
      // 新しくBoardに複製して追加
      if (SpellList.some(spell => spell.id === item.id))
        addImageToBoard(item);
      // 並び替え
      // else if (boarditems.some(spell => spell.id === item.id)) {
      //   return ;
      // }
      else {
        return ;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (item) => {
    const cloneSpell = {...item, id: uuidv4()};
    setBoard((prevboard) => ([...prevboard, cloneSpell]));
  };

  // この中身が未完成
  const handleSort = useCallback((dragIndex, hoverIndex) => {
    setBoard((prevRows) =>
      update(prevRows, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevRows[dragIndex]]
        ]
      })
    );
  }, []);


  return (
    <>
      <div className="Pictures">
        {SpellList.map((spell) => {
          return <Spell spell={spell} key={uuidv4()} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {boarditems.map((spell, index) => (
          <Spell spell={spell} key={uuidv4()} onSortEnd={handleSort} index={index}/>
        ))}
      </div>
    </>
  );
}
export default DragDrop;