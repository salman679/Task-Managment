import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { io } from "socket.io-client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Initialize socket connection
const socket = io(import.meta.env.VITE_api);

const Task = () => {
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const categories = ["To-Do", "In Progress", "Done"];

  // Fetch tasks using React Query
  const { data: allTasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_api}/tasks`);
      return data;
    },
  });

  // Real-time updates using Socket.io
  useEffect(() => {
    const updateTasks = () => refetch();

    socket.on("taskUpdated", updateTasks);
    socket.on("taskAdded", updateTasks);
    socket.on("taskDeleted", updateTasks);

    return () => {
      socket.off("taskUpdated", updateTasks);
      socket.off("taskAdded", updateTasks);
      socket.off("taskDeleted", updateTasks);
    };
  }, [refetch]);

  // Add new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = {
      title: newTask,
      description,
      category,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`${import.meta.env.VITE_api}/task`, task);
      refetch();
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setNewTask("");
    setDescription("");
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_api}/task/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingId(task._id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCategory(task.category);
  };

  // Save edited task
  const handleSaveTask = async (id) => {
    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
      category: editedCategory,
    };

    try {
      await axios.patch(`${import.meta.env.VITE_api}/task/${id}`, updatedTask);
      refetch();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle drag and drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newCategory = result.destination.droppableId;

    try {
      await axios.patch(`${import.meta.env.VITE_api}/task/${taskId}`, {
        category: newCategory,
      });
      refetch();
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  return (
    <div className="w-11/12 max-w-7xl lg:w-9/12 mx-auto py-6 mb-10">
      {/* Input fields for new task */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          className="flex-grow rounded-lg border p-3"
          placeholder="Task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          className="flex-grow rounded-lg border p-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="rounded-lg border border-gray-300 p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          className="rounded-lg bg-gray-800 px-5 py-3 text-white"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Droppable key={cat} droppableId={cat}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 rounded-lg shadow-lg bg-white"
                >
                  <h3 className="mb-3 text-lg font-semibold text-gray-700 border-b pb-2">
                    {cat}
                  </h3>
                  {allTasks
                    .filter((task) => task.category === cat)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 flex flex-col bg-gray-100 p-3 rounded-lg"
                          >
                            {editingId === task._id ? (
                              <>
                                <input
                                  type="text"
                                  className="w-full bg-white border p-1 text-gray-700 mb-2"
                                  value={editedTitle}
                                  onChange={(e) =>
                                    setEditedTitle(e.target.value)
                                  }
                                />
                                <input
                                  type="text"
                                  className="w-full bg-white border p-1 text-gray-700 mb-2"
                                  value={editedDescription}
                                  onChange={(e) =>
                                    setEditedDescription(e.target.value)
                                  }
                                />
                                <select
                                  className="w-full bg-white border p-1 text-gray-700"
                                  value={editedCategory}
                                  onChange={(e) =>
                                    setEditedCategory(e.target.value)
                                  }
                                >
                                  {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                      {cat}
                                    </option>
                                  ))}
                                </select>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <h3 className="text-gray-700 font-bold">
                                    {task.title}
                                  </h3>
                                  <p
                                    className={`font-semibold inline-flex items-center gap-3 ${
                                      task.category === "To-Do"
                                        ? "text-blue-400"
                                        : task.category === "In Progress"
                                        ? "text-yellow-500"
                                        : "text-green-400"
                                    }`}
                                  >
                                    {task.category}
                                  </p>
                                </div>
                                {task.description && (
                                  <p className="text-sm text-gray-500">
                                    {task.description}
                                  </p>
                                )}
                              </>
                            )}

                            <div className="flex justify-between w-full mt-2">
                              <span className="text-xs text-gray-400">
                                {new Date(task.timestamp).toLocaleString()}
                              </span>
                              <div className="flex gap-4">
                                {editingId === task._id ? (
                                  <button
                                    className="text-green-500"
                                    onClick={() => handleSaveTask(task._id)}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    className="text-blue-500"
                                    onClick={() => handleEditTask(task)}
                                  >
                                    <MdEdit className="text-2xl" />
                                  </button>
                                )}
                                <button
                                  className="text-red-500"
                                  onClick={() => handleDeleteTask(task._id)}
                                >
                                  <FaRegTrashAlt className="text-2xl" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Task;
