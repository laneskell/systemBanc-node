import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateUserPage from "../pages/CreateUserPage";
import ErrorPage from "../pages/ErrorPage";
import ExtractPage from "../pages/extractPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PaymentPage from "../pages/PaymentPage";
import TransferPage from "../pages/TransferPage";

const Router = () => {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/createUser'>
          <CreateUserPage />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/extract/:id'>
          <ExtractPage />
        </Route>
        <Route exact path='/payment'>
          <PaymentPage />
        </Route>
        <Route exact path='/transfer'>
          <TransferPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
