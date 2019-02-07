import React, { Component } from 'react';
import './app.css';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import TodoList from '../TodoList';
import ItemAddForm from '../ItemAddForm';
import uuid from 'uuid/v4';

class App extends Component {
  state = {
    todoData: [
      this.createTodoItem("Drink Coffe"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
      this.createTodoItem("Created page design"),
      this.createTodoItem("Go to gym")
    ],
    searchTerm: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: uuid()
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(item => item.id !== id);
      return {
        todoData: newTodoData
      };
    });
  };

  addItem = text => {
    const newitem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newitem];
      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];

    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchChange = searchTerm => {
    console.log(this);
    this.setState({ searchTerm });
  };

  search(items, searchTerm) {
    if (!items.length) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  };

  onChangeFilter = (filter) => {
    this.setState({ filter })
  };
  
  render() {
    const { todoData, searchTerm, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, searchTerm), filter);

    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onChangeFilter={this.onChangeFilter}/>
        </div>
        <ItemAddForm onItemAdded={this.addItem} />
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
      </div>
    );
  }
}

export default App;
