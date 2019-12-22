import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faSquare, faCheckSquare, faTimes);

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      term: '',
    };
  }

  render() {
    return (
      <div className="todo-list">
        <h1>Todo</h1>
        <TaskAdder
          onChange={this.onChange}
          addTask={this.addTask}
          term={this.state.term}
        />
        <TaskList tasks={this.state.tasks} handleDelete={this.deleteTask} />
      </div>
    );
  }

  onChange = event => {
    this.setState({
      term: event.target.value,
    });
  };

  addTask = () => {
    const newTask = this.state.term;

    if (newTask.length === 0) return;

    this.setState(state => {
      return {
        tasks: state.tasks.concat(newTask),
        term: '',
      };
    });
  };

  deleteTask = id => {
    this.setState(state => ({
      tasks: state.tasks.filter((task, index) => index !== id),
    }));
  };
}

const TaskAdder = ({ onChange, term, addTask }) => {
  return (
    <div className="task-adder">
      <input
        onChange={e => onChange(e)}
        value={term}
        placeholder="Enter a task here..."
        type="text"
        name="taskName"
        id="task_name"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

const TaskList = ({ tasks, handleDelete }) => {
  const listItems = tasks.map((task, index) => (
    <TaskItem key={index} id={index} task={task} handleDelete={handleDelete} />
  ));
  return (
    <div className="task-list">
      <ul>{listItems}</ul>
    </div>
  );
};

const TaskItem = ({ task, id, handleDelete }) => {
  return (
    <li className="task-item">
      <span className="task-content">{task}</span>
      <TaskStatusIndicator taskId={id} handleDelete={handleDelete} />
    </li>
  );
};

class TaskStatusIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    let statusIcon = (
      <FontAwesomeIcon
        icon={['far', 'square']}
        onClick={this.handleStatusClick}
      />
    );
    if (this.state.checked) {
      statusIcon = (
        <FontAwesomeIcon
          icon={['far', 'check-square']}
          onClick={this.handleStatusClick}
        />
      );
    }

    return (
      <span className="task-status-indicator">
        {statusIcon}
        <FontAwesomeIcon
          icon={['fas', 'times']}
          onClick={this.handleDeleteClick}
        />
      </span>
    );
  }

  handleStatusClick = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  handleDeleteClick = () => {
    this.props.handleDelete(this.props.taskId);
  };
}

// ========================================

ReactDOM.render(<TodoList />, document.getElementById('root'));
