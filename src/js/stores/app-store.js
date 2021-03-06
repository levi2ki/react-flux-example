import { dispatch, register } from "../dispatchers/app-dispatcher";
import AppConstants from "../constants/app-constants";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

let _catalog = [];

for (let i = 0; i < 9; i += 1) {
  _catalog.push({
    id: "Widget" + i,
    title: "Widget #" + i,
    summary: "A great item",
    description: "Lorem ipsum",
    cost: i
  });
}

let _cartItems = [];

const _removeItem = item => {
  _cartItems.splice(_cartItems.findIndex(i => i === item), 1);
};

const _findItem = item => {
  return _cartItems.find(cartItem => cartItem.id === item.id);
};

const _increaseItem = item => item.qty++;

const _decreaseItem = item => {
  item.qty--;
  if (item.qty <= 0) {
    _removeItem(item);
  }
};

const _addItem = item => {
  const cartItem = _findItem(item);
  if (!cartItem) {
    _cartItems.push({ qty: 1, ...item });
  } else {
    _increaseItem(item);
  }
};

const _cartTotals = (qty = 0, total = 0) => {
  _cartItems.forEach(cartItem => {
    qty += cartItem.qty;
    total += cartItem.qty * cartItem.cost;
  });
  return { qty, total };
};

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getCart() {
    return _cartItems;
  },

  getCatalog() {
    return _catalog.map(item => ({
      ...item,
      ..._cartItems.find(cItem => cItem.id === item.id)
    }));
  },
  getCartTotals() {
    return _cartTotals();
  },

  dispatcherIndex: register(action => {
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(action.item);
        break;
      case AppConstants.REMOVE_ITEM:
        _removeItem(action.item);
        break;
      case AppConstants.INCREASE_ITEM:
        _increaseItem(action.item);
        break;
      case AppConstants.DECREASE_ITEM:
        _decreaseItem(action.item);
        break;
    }

    AppStore.emitChange();
  })
});

export default AppStore;
