import { observable } from "mobx"

export class Todo {
  id = Math.random()
  @observable title = ""
  @observable finished = false
}