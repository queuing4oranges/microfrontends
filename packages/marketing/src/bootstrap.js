//add main startup code
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//mount function to start app - will be called with some kind of html element
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

//if we are in dev mode or in isolation - call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot); //if element exists, mount devRoot (here html with that id)
  }
}

//running through container - export mount function, so container can decide where to mount our marketing app
export { mount };
