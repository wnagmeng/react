import { observable, computed } from "mobx"
import { Todo } from "./Todo";

export class TodoList {
  @observable todos: Todo[] = [];
  @computed
  get unfinishedTodoCount(): number {
    return this.todos.filter(todo => !todo.finished).length;
  }
}