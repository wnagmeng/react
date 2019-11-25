import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Welcome from './Welcome';
// import App from "./App";
// import BasicRouter from "./router/BasicRouter";
// import BasicRouter from "./router/Hashed";
// import BasicRouter from "./router/BadOrdered";
// import BasicRouter from "./router/Navs";
// import BasicRouter from "./router/DynParameter";
// import BasicRouter from "./router/RedirectWithData";
// import BasicRouter from "./router/CustomizedLink";
// import BasicRouter from "./router/PreventLeaving";
// import BasicRouter from "./router/NotFound";
// import BasicRouter from "./router/Query";
// import BasicRouter from "./router/Recursive";
// import BasicRouter from "./router/SideBar";
// import BasicRouter from "./advanced/NoHook";
// import BasicRouter from "./advanced/WithHook";
// import BasicRouter from "./advanced/WithoutHook";
// import BasicRouter from "./advanced/MultiHook";
// import BasicRouter from "./advanced/EffectHook";
// import BasicRouter from "./advanced/CleanupEffectHook";
// import BasicRouter from "./advanced/CustomizedHook";
// import BasicRouter from "./advanced/NoContext";
// import BasicRouter from "./advanced/WithContext";
import BasicRouter from "./advanced/FunctionContext";

// import BasicRouter from "./router/NestedRouter";
// import Clock from './Clock';
// import DOMRef from "./DOMRef";
// import ClassRef from "./ClassRef";
// import FunctionRef from "./FunctionRef";
// import CallbackRef from "./CallbackRef";
// import ForwardRef from "./ForwardRef";
// import BComponent from "./ABComponent";
// import RunTimeComponent from "./RunTimeComponent";
// import FileInputComponent from "./FileInputComponent";
// import TableFragement from "./TableFragement";
import * as serviceWorker from "./serviceWorker";

// const props = {
//   handle: (value: any) => {
//     console.log("get value: ", value);
//     // props.value = value
//   }
// };

// class MyComponent extends React.Component {
//   private ref: RefObject<HTMLDivElement>;
//   constructor(props:any) {
//     super(props);
//     this.ref = React.createRef<HTMLDivElement>();
//   }
//   render() {
//     return <div ref={this.ref} >Hello RefObject!</div>;
//   }
// }

// function Lower(props: any) {
//   return <div>{props.children}</div>;
// }

// ReactDOM.render(<RunTimeComponent type="B" />, document.getElementById("root"));
// ReactDOM.render(
//   <TableFragement
//     tds={[
//       ["a1", "b1", "c1"],
//       ["a2", "b2", "c2"]
//     ]}
//   />,
//   document.getElementById("root")
// );

// ReactDOM.render(<Welcome name="Eric1" />, document.getElementById('root'));
ReactDOM.render(<BasicRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
