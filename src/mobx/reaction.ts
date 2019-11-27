import { reaction } from "mobx"

import { Todo } from "./Todo";
import { TodoList } from "./TodoList";



const todo: Todo = new Todo();
const todoList: TodoList = new TodoList();

todoList.todos.push(todo);


const reaction1 = reaction(
  () => todoList.todos.length,
  length => console.log("reaction 1: length", length)
)

const reaction2 = reaction(
  () => todoList.todos.map(todo => todo.title),
  titles => console.log("reaction 2:", titles.join(", "))
)

const reaction3 = reaction(
  () => todoList.todos.length,
  (length, reaction) => {
    console.log("reaction 3: invoked. and dispose!");
    console.log("length : ", length);
    reaction.dispose()
  }
)

const todo1: Todo = new Todo();
todoList.todos.push(todo1);
todoList.todos.pop();


todo.title = "hello";
todo.title = "hello 1";

todo.finished = true;

reaction1();
reaction2();

reaction3();
todoList.todos.push(todo1);
todoList.todos.pop();

todo.title = "hello 2";




