import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import BoardData from "../data/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";



function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newBoardData = [...boardData];
    const draggedItem = newBoardData[source.droppableId].items[source.index];
    newBoardData[source.droppableId].items.splice(source.index, 1);
    newBoardData[destination.droppableId].items.splice(destination.index, 0, draggedItem);
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.key === 'Enter') {
      const val = e.target.value;
      if (val.trim().length === 0) {
        setShowForm(false);
        return;
      }
      const boardId = parseInt(e.target.getAttribute('data-id'));
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: val.trim(),
        priority: 0,
        chat: 0,
        attachment: 0,
        assignees: []
      };
      const newBoardData = [...boardData];
      newBoardData[boardId].items.push(newItem);
      setBoardData(newBoardData);
      setShowForm(false);
      e.target.value = '';
    }
  };

  return (
    <Layout>
      <div className="px-20 py-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial justify-between">
          <div className="flex w-full justify-between">
            <div className="relative flex-auto mr-2">
              <div className="flex items-center bg-gray-200 px-10 py-1 rounded-md">
                <CiSearch className="w-4 h-4 mr-2 text-black" /> {/* Ícone */}
                <input
                  id="input1"
                  type="text"
                  placeholder="Id, título ou descrição"
                  className="p-2 w-full bg-transparent outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="relative flex-auto mr-2">
              <label htmlFor="input2" className="absolute top-0 left-0 bg-white px-1 text-xs text-gray-500 ml-2">
                Executante
              </label>
              <input id="input2" type="text" className="border p-2 w-full" />
            </div>

            <div className="relative flex-auto mr-2">
              <label htmlFor="input3" className="absolute top-0 left-0 bg-white px-1 text-xs text-gray-500 ml-2">
                Solicitante
              </label>
              <input id="input3" type="text" className="border p-2 w-full" />
            </div>

            <div className="relative flex-auto mr-2">
              <label htmlFor="input4" className="absolute top-0 left-0 bg-white px-1 text-xs text-gray-500 ml-2">
                Projetos
              </label>
              <input id="input4" type="text" className="border p-2 w-full" />
            </div>

            <div className="relative flex-auto">
              <label htmlFor="input5" className="absolute top-0 left-0 bg-white px-1 text-xs text-gray-500 ml-2">
                Tipo
              </label>
              <input id="input5" type="text" className="border p-2 w-full" />
            </div>
          </div>
        </div>
        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-5 my-5">
              {boardData.map((column, columnIndex) => (
                <div key={columnIndex}>
                  <Droppable droppableId={columnIndex.toString()}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`rounded-md shadow-md flex flex-col relative overflow-hidden ${columnIndex === 0 ? 'bg-gray-100' :
                          columnIndex === 1 ? 'bg-blue-50' :
                            'bg-green-50'
                          }`}
                        style={{ minHeight: '200px' }}
                      >
                        <h4 className="p-3 flex justify-between items-center mb-2">
                          <span className="text-2xl text-gray-600">{column.name}</span>
                        </h4>
                        <div className="overflow-y-auto overflow-x-hidden h-auto" style={{ maxHeight: 'calc(100vh - 290px)' }}>
                          {column.items.map((item, itemIndex) => (
                            <CardItem key={item.id} data={item} index={itemIndex} />
                          ))}
                          {provided.placeholder}
                        </div>
                        {showForm && selectedBoard === columnIndex && (
                          <div className="p-3">
                            <textarea
                              className="border-gray-300 rounded focus:ring-purple-400 w-full"
                              rows={3}
                              placeholder="Task info"
                              data-id={columnIndex}
                              onKeyDown={(e) => onTextAreaKeyPress(e)}
                            />
                          </div>
                        )}
                        {!showForm && (
                          <button
                            className="flex justify-center items-center my-3 space-x-2 text-lg"
                            onClick={() => {
                              setSelectedBoard(columnIndex);
                              setShowForm(true);
                            }}
                          >
                            <span>Amanhã ou depois</span>
                            <FaChevronDown className="w-5 h-5 text-gray-500" />
                          </button>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}

export default Home;