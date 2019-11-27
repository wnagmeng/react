import { autorun } from "mobx"
import { Todo } from "./Todo";

const todo: Todo = new Todo();
const disposer = autorun(() => {
  console.log("Tasks title: " + todo.title);
})

todo.title = "hello";
todo.title = "hello 1";
disposer();
todo.title = "hello 2";




