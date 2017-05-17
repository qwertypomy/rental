import React from 'react';

import './styles.scss';

class ItemView extends React.Component {

  render() {
    var { name, description, daily_rate, attributes } = this.props.data;

    return (
      <div className="card col-md-3">
        <img className="card-img-top" src={attributes.imgs[0]} alt="Card image cap"/>
        <div className="card-block">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          <h6 className="card-subtitle mb-2 text-muted">{daily_rate + " UAH/day"}</h6>
          <a href="#" className="btn btn-primary">Book</a>
        </div>
      </div>
    );
  }
}

export default ItemView;
