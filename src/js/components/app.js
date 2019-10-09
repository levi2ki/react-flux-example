import React from "react";
import AppActions from "../actions/app-actions";
import AppCatalog from "./app-catalog";
import AppCart from "./app-cart";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <AppCatalog />
        <AppCart />
      </div>
    );
  }
}
