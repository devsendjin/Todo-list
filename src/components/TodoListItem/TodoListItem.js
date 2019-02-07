import React, { Component } from 'react';
import './todoListitem.css';

class TodoListItem extends Component {
  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important
    } = this.props;

    let classNames = 'todo-list-item d-flex';

    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={onDeleted}
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={onToggleImportant}
          >
            <i className="fa fa-exclamation" />
          </button>
        </div>
      </span>
    );
  }
}

export default TodoListItem;
