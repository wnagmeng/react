import { autorun } from "mobx"

import { Todo } from "./Todo";
import { TodoList } from "./TodoList";


const todo: Todo = new Todo();
const todoList: TodoList = new TodoList();
todoList.todos.push(todo);

const disposer = autorun(() => {
  console.log("Tasks left: " + todoList.unfinishedTodoCount);
})

todo.finished = true;

todo.title = "hello 2";

todo.finished = false;

disposer();

todo.finished = true;

todo.finished = false;




