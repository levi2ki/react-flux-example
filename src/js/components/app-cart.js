import React from "react";
import AppStore from "../stores/app-store";
import withStoreWatcher from "../mixins/with-store-watcher";
import AppCartItem from "./app-cart-item";

const cartItems = () => ({ items: AppStore.getCart() });

const AppCart = props => {
  let total = 0;
  let items = props.items.map((item, idx) => {
    let subtotal = item.cost * item.qty;
    total += subtotal;
    return <AppCartItem subtotal={subtotal} key={String(idx)} item={item} />;
  });

  return (
    <div>
      <h1>Cart</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Qty</th>
            <th></th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-right">
              Total
            </td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default withStoreWatcher(AppCart, cartItems)