import React from "react";
import AppCartButton from "./app-cart-button";
import AppActions from "../actions/app-actions";

export default props => (
  <tr>
    <td>
      <AppCartButton
        text="x"
        handler={AppActions.removeItem.bind(null, props.item)}
      />
    </td>
    <td>{props.item.title}</td>
    <td>{props.item.qty}</td>
    <td>
      <div className="btn-group">
        <AppCartButton
          text="-"
          onClick={AppActions.decreaseItem.bind(null, props.item)}
        />
        <AppCartButton
          text="+"
          onClick={AppActions.increaseItem.bind(null, props.item)}
        />
      </div>
    </td>
    <td>{props.subtotal}</td>
  </tr>
);
