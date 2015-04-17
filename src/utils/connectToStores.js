import React from 'react';

function connectToStores(Component, stores, getStateFromStores) {
  return class StoreConnection extends React.Component {

    constructor() {
      super();
      this.state = getStateFromStores(this.props);
    }

    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );
    }

    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    }

    handleStoresChanged = () => {
      this.setState(getStateFromStores(this.props));
    }

    render() {
      return <Component {...this.props} {...this.state} />
    }
  };
}

export default connectToStores;
