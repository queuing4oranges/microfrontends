import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        //restruct of obj
        //arg location is an obj that has info about where we navigate to
        //find out what was navigated to and updated it in the visible url
        // console.log(nextPathname);

        //need to do a little check to prevent infinite loop
        const { pathname } = history.location; //where we are currently at
        if (pathname !== nextPathname) {
          history.push(nextPathname); //push fct - says it wants to navigate to nextPathname
        }
      },
    }); //creates an instance of our marketing app and renders it into that div, 2nd arg are options
    history.listen(onParentNavigate); //any time there is change to our browserhistory, we want to call onParentNavigate
  }, []);

  return <div ref={ref} />; //reference to the html element
};
