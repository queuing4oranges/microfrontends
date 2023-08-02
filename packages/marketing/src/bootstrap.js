//add main startup code
import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

//mount function to start app - will be called with some kind of html element
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    }); //if theres defaulthistory provided, use it, otherwise make memoryhistory
  //defaulthistory is only provided when calling the mount fct (line38)
  //creating the history here and passing it down to App (due to the fact that it will be a lot of code)
  //the history obj that comes back has an event listener tied to it
  if (onNavigate) {
    history.listen(onNavigate); //when navigation occurs this history obj is gonna call any fct we have provided as arg
  }
  //so whenver the path changes, we want it to call the navigate fct

  ReactDOM.render(<App history={history} />, el);

  //mount fct needs to return an object, so container has any communication to it
  return {
    onParentNavigate({ pathname: nextPathname }) {
      //any time the parent navigates, we want to call this fct
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

//if we are in dev mode or in isolation - call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() }); //if element exists, mount devRoot (here html with that id)
  } //adding empty obj, bc it expects a second arg
}

//running through container - export mount function, so container can decide where to mount our marketing app
export { mount };
