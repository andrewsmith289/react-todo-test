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

        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }

  onChange = event => {
    this.setState({
      term: event.target.value,
    });
  };

  addTask = () => {
    console.log('yolo');
    const newTask = this.state.term;

    if (newTask.length === 0) return;

    this.setState(state => {
      return {
        tasks: state.tasks.concat(newTask),
        term: '',
      };
    });
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
    const listItems = tasks.map((task, index) => <li key="{index}">{task}</li>);
    return (
      <div className="task-list">
        <h2>Task List</h2>
        <ul>{listItems}</ul>
      </div>
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
    return <div className="task-status-indicator"></div>;
  }
}

// ========================================

ReactDOM.render(<TodoList />, document.getElementById('root'));
