import React from "react";
import { Switch, Route, Router } from "react-router-dom"; //Router is gonna create a history object instead of it being created by the react-router-dom
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

//this will prefix all the generated classnames (to prevent doubles)
const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      {/* stylesprovider is a react component, that is used to customize css */}
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            {/* <Route path="/auth/signin" component={Signin} />  // refactor so we can pass down SignIn callback*/}
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>

            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
