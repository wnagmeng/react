import React, { useState, useEffect } from "react";

function useTimer() {
  const [time, setTime] = useState(new Date());
  const [infinite] = useState(0);
  useEffect(() => {
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
  }, [infinite]);

  return time;
}
export default function CustomizedHook() {
  const [count, setCount] = useState(0);
  const time = useTimer();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    if (count > 3) {
      console.log("inside count > 3");
      document.body.innerHTML = "";
    }
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
