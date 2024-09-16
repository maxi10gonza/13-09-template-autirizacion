import { Router } from "express";
import { createTodo, getAllTodosCtrl, updateTodoById, deleteTodoById } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

// Obtener todas las tareas del usuario
todosRouter.get("/", validarJwt, getAllTodosCtrl);

// Crear una nueva tarea para el usuario
todosRouter.post("/:userId", validarJwt, createTodo);

// Actualizar una tarea existente para el usuario
todosRouter.put("/:id", validarJwt, updateTodoById);

// Eliminar una tarea existente para el usuario
todosRouter.delete("/:id", validarJwt, deleteTodoById);


export { todosRouter };
