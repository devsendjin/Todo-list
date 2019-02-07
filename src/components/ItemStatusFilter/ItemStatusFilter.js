import React, { Component } from 'react';
import './itemStatusFilter.css';

class ItemStatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  render() {
    const { filter, onChangeFilter } = this.props;

    const btns = this.buttons.map(btn => {
      const isActive = filter === btn.name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button
        type="button"
        className={`btn ${clazz}`}
        key={btn.name}
        onClick={() => onChangeFilter(btn.name)}
        >
          {btn.label}
        </button>
      );
    });
    return <div className="btn-margin">{btns}</div>;
  }
}

export default ItemStatusFilter;
