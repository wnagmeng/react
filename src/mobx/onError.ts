import { autorun, observable } from "mobx"

const age = observable.box(10);

const disposer = autorun(() => {
  if (age.get() < 0) throw new Error("Age should not be negative");
  console.log("Age", age.get());
}, {
  onError(e) {
    console.log("Please enter a valid age");
  }
});

age.set(1);
age.set(-1);



