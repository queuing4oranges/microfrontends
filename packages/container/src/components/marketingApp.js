import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current); //creates an instance of our marketing app and renders it into that div
  });

  return <div ref={ref} />; //reference to the html element
};
