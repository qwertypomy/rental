import React from 'react';

class ItemView extends React.Component {

  render() {
    var { name, description, daily_rate, attributes } = this.props.data;

    return (
      <div>{name}</div>
    );
  }
}

export default ItemView;
