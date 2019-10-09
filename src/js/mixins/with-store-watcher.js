import React from "react";
import AppStore from "../stores/app-store";

export default (WrappedComponent, stateCallback) =>
  class StateWatcher extends React.Component {
    constructor(props) {
      super(props);
      this.state = stateCallback(props);
      AppStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
      AppStore.removeChangeListener(this.onChange);
    }
    onChange = () => {
      this.setState(stateCallback(this.props));
    };
    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
