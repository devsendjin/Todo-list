import React, { Component } from 'react';
import './ItemAddForm.css';

class ItemAddForm extends Component {
  state = {
    label: '',
    inputCls: 'form-control mr-1'
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.label.length) {
      let cls = '';
      this.setState(
        ({ inputCls }) => {
          cls = inputCls + ' wrong-input';
          return {
            inputCls: cls
          };
        },
        () => {
          const timer = setTimeout(() => {
            this.setState({
              inputCls: 'form-control mr-1'
            });
            clearTimeout(timer);
          }, 2000);
        }
      );
    } else {
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: ''
      });
    }
  };

  render() {
    return (
      <form className="item-add-form d-flex mb-2" onSubmit={this.onSubmit}>
        <input
          type="text"
          className={this.state.inputCls}
          onChange={this.onLabelChange}
          value={this.state.label}
          placeholder="What needs to be done"
        />
        <button type="submit" className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    );
  }
}

export default ItemAddForm;
