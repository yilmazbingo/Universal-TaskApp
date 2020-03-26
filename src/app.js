import React from "react";
import ReactDOM from "react-dom";
import TaskApp from "./components/TaskApp";
import Favicon from "react-favicon";
import img from "./images/pict.jpg";

function render(Component) {
  ReactDOM.hydrate(
    <div>
      <Favicon url={img} />
      <Component />
    </div>,
    document.getElementById("react-root")
  );
}

render(TaskApp);
