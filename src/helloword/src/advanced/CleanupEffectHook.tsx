import React, { useState, useEffect } from "react";

export default function CleanupEffectHook() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    if (count > 3) {
      console.log("inside count > 3");
      document.body.innerHTML = "";
    }
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    console.log("timer created + ");

    return () => {
      console.log("timer cleared -");
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [count]);

  return (
    <div>
      <h1>CleanupEffectHook</h1>
      <p>
        Started at {time.getHours()} : {time.getMinutes()} : {time.getSeconds()}
      </p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
