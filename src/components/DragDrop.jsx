import React, { useState } from "react";
import Spell from "./Spell";
import { useDrop } from "react-dnd";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import { border } from "@chakra-ui/react";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startInidex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const copy = (src, dst, droppableSrc, droppableDst) => {
  const srcClone = Array.from(src);
  const dstClone = Array.from(dst);
  const item = srcClone[droppableSrc.index];

  dstClone.splice(droppableDst.index, 0, { ...item, id: uuid() });
  return dstClone;
}

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

function isSpell(x) {
  const number = parseInt(x, 10);

  if (!isNaN(number) && number >= 1 && number <= 3)
    return true;
  
  return false;
}

function DragDrop() {
  const [board, setBoard] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    // item はドロップされたitemの情報
    drop: (item) => {
      // IDがSpellListのものと一致する場合
      // 新しくBoardに複製して追加
      if (isSpell(item.id)) {
        addImageToBoard(item);
      }
      else if (board.some(spell => spell.id === item.id)) {
        return ;
      }
      else {
        return ;
      }
      // switch (item.id) {
      //   // 並び替えを実行する: Sortable
      //   case board.id:
      //     reorder(board, src.index, dst.index);
      //     break;
      //   // Boardに追加する
      //   case SpellList.id:
      //     addImageToBoard(item.id);
      //     break;
      //   // ドラッグしたSpellを削除
      //   default:
      //     addImageToBoard(item.id);
      //     break;
      // }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (item) => {
    const cloneSpell = {...item, id: uuidv4()};
    console.log(cloneSpell);
    setBoard((prevboard) => ([...prevboard, cloneSpell]));
  };
  return (
    <>
      <div className="Pictures">
        {SpellList.map((spell) => {
          return <Spell id={spell.id} name={spell.name} path={spell.path} key={uuidv4()} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((spell, index) => {
          return <Spell id={spell.id} name={spell.name} path={spell.path} key={uuidv4()} />;
        })}
      </div>
    </>
  );
}
export default DragDrop;