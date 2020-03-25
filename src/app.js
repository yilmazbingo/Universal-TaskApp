import React from "react";
import ReactDOM from "react-dom";
import TaskApp from "./components/TaskApp";

function render(Component) {
  ReactDOM.hydrate(<Component />, document.getElementById("react-root"));
}

render(TaskApp);
