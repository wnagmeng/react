import { Map } from 'immutable';

const first = Map({
  foo: Map({
    val: 10
  }),
  bar: Map({
    val: 20
  })
});

const second = first.setIn(["foo", "bar"], 500);

console.log(second === first);
console.log(second.get("foo") === first.get("foo"));
console.log(second.get("bar") === first.get("bar"));