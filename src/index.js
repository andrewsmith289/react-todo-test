import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class TaskAdder extends React.Component {
  render() {
    return (
      <div className="task-adder">
        <input
          onChange={e => this.props.onChange(e)}
          value={this.props.term}
          type="text"
          name="taskName"
          id="task_name"
        />
        <button onClick={this.props.addTask}>Add Task</button>
      </div>
    );
  }
}

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks;
    const listItems = tasks.map((task, index) => (
      <TaskItem
        key={index}
        id={index}
        task={task}
        handleDelete={this.props.handleDelete}
      />
    ));
    return (
      <div className="task-list">
        <h2>Task List</h2>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

class TaskItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.task}
        <TaskStatusIndicator
          taskId={this.props.id}
          handleDelete={this.props.handleDelete}
        />
      </li>
    );
  }
}

class TaskStatusIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    const uncheckedIcon = 'square-empty-32.png';
    const checkedIcon = 'square-checked-32.png';
    const xIcon = 'x-32.png';

    let statusIcon = uncheckedIcon;
    if (this.state.checked) {
      statusIcon = checkedIcon;
    }

    return (
      <span className="task-status-indicator">
        <img
          src={statusIcon}
          alt={statusIcon}
          onClick={this.handleStatusClick}
        />
        <img src={xIcon} alt="Delete Task" onClick={this.handleDeleteClick} />
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
