import React from "react";
import Image from "next/image";
import {
  PlusIcon,
  ChatAlt2Icon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Draggable } from "react-beautiful-dnd";
import { GoProjectSymlink } from "react-icons/go";


function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <div className="flex justify-between items-center">
            <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
            <div className="bg-gray-200 text-gray-700 text-sm font-bold px-2 py-1 rounded">
              {data.score}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <ChatAlt2Icon className="w-4 h-4 text-gray-500" />
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <PaperClipIcon className="w-4 h-4 text-gray-500" />
                <span>{data.attachment}</span>
              </span>
            </div>
            <ul className="flex space-x-3 items-center">
              {data.assignees.map((ass, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <GoProjectSymlink className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">Nome do projeto</span>
                </li>
              ))}
            </ul>
          </div>
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${data.priority === 0
                ? "from-blue-400 to-blue-300"
                : data.priority === 1
                  ? "from-green-400 to-green-300"
                  : "from-red-400 to-red-300"
              }
              `}
          >
            {data.priority === 0
              ? "Baixa prioridade"
              : data.priority === 1
                ? "Média Prioridade"
                : "Alta Prioridade"}
          </label>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;