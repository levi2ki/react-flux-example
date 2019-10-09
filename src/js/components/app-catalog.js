import React from "react";
import AppStore from "../stores/app-store";
import withStoreWatcher from "../mixins/with-store-watcher";
import CatalogItem from "./app-catalog-item";

const getCatalog = () => ({ items: AppStore.getCatalog() });

const Catalog = props => (
  <div className="row">
    {props.items.map(item => (
      <CatalogItem key={item.id} item={item} />
    ))}
  </div>
);

export default withStoreWatcher(Catalog, getCatalog);
