import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const userId = req.user.id;
  const userTodos = database.todos.filter((todo) => todo.owner === userId);
  res.json({ todos: userTodos });
};

//Controlador para crear tarea
export const createTodo = (req, res) => {
  const { title, completed } = req.body;
  const owner = req.user.id; // Asignar el ID del usuario autenticado

  // Generador de ID automático 
  const newId = database.todos.length
    ? Math.max(...database.todos.map(t => t.id)) + 1
    : 1;

  const newTask = { id: newId, title, completed, owner };
  database.todos.push(newTask);

  res.json({ message: 'Tarea agregada correctamente', newTask });
};

//Controlador para actulizar tarea por id
export const updateTodoById = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const owner = req.user.id;

  // Buscar la tarea por ID y propietario
  const taskIndex = database.todos.findIndex(t => t.id === parseInt(id) && t.owner === owner);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  // Actualizar la tarea
  database.todos[taskIndex] = {
    ...database.todos[taskIndex],
    title: title || database.todos[taskIndex].title,
    completed: completed !== undefined ? completed : database.todos[taskIndex].completed
  };

  const updatedTask = database.todos[taskIndex];

  res.json({ message: 'Tarea actualizada correctamente', updatedTask });
};

//Controlador para eliminar tarea por id
export const deleteTodoById = (req, res) => {
  const userId = req.user.id;
  const todoId = parseInt(req.params.id);
  const todoIndex = database.todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  database.todos.splice(todoIndex, 1);
  res.json({ message: "Tarea eliminada con éxito" });

}

