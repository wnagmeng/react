import { autorun } from "mobx"
import { Todo } from "./Todo";

const todo: Todo = new Todo();
let count = 0;
const disposer = autorun(() => {
  console.log(new Date().getTime());
  console.log("Tasks title: " + todo.title);
}, {
  scheduler: (run) => {
    if (count < 2) {
      run();
    } else {
      setTimeout(run, 1000)
    }
    count++;
    if(count === 4) {
      disposer();
      // run.dispose();
    }
  }
});

todo.title = "hello";
todo.title = "hello 1";
todo.title = "hello 2";





