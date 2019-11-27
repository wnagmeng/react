import { autorun } from "mobx"
import { Todo } from "./Todo";

const todo: Todo = new Todo();
const disposer = autorun(() => {
  console.log("Tasks title: " + todo.title);
}, {
  delay: 100
});

todo.title = "hello";
todo.title = "hello 1";
todo.title = "hello 2";
setTimeout(() => { todo.title = "hello 3"; }, 100);
setTimeout(() => { todo.title = "hello 4"; }, 150);
setTimeout(() => { todo.title = "hello 5"; }, 210);
setTimeout(() => { todo.title = "hello 6"; }, 270);

setTimeout(() => { disposer(); }, 1000);






