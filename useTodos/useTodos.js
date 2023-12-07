import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodos = () => {
    const initialState = [];

    const init = () => {
        return JSON.parse(localStorage.getItem("todos")) || initialState;
    };

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (newTodo) => {
        const action = {
            type: "[TODO] Add Todo",
            payload: newTodo,
        };
        dispatchTodo(action);
    };

    const handleRemoveTodo = (todoId) => {
        const action = {
            type: "[TODO] Remove Todo",
            payload: todoId,
        };
        dispatchTodo(action);
    };

    const handleToggleTodoStatus = (todoId) => {
        const action = {
            type: "[TODO] Toggle Todo",
            payload: todoId,
        };
        dispatchTodo(action);
    };

    return {
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodoStatus,
        pendingTodos: todos.filter((todo) => !todo.done).length,
        completedTodos: todos.filter((todo) => todo.done).length,
        todos
    }
}
