import { Map } from 'immutable';

const first = Map({ key: "value" });

const second = first.set("key", "foo");

const third = first.set("key", "value");

console.log(second === first);

console.log(third === first);