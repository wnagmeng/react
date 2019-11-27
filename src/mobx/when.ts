import { when } from "mobx"
import { Todo } from "./Todo";

const todo: Todo = new Todo();

const disposer = when(
  () => todo.finished,
  () => console.log("when invoked")
);

console.log("finished 1");
todo.finished = true;
console.log("finished 2");

todo.finished = false;
console.log("finished 3");

disposer();
console.log("finished 4");

todo.finished = true;
