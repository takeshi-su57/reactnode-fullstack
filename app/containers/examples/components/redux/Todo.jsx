import React from 'react';
import { connect } from 'react-redux';

const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});
const toggleTodo = id => ({ type: 'TOGGLE_TODO', id });

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { id: action.id, text: action.text, completed: false };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

// Reducers-------------
const todos = (state = [], action) => {
  var retState;
  switch (action.type) {
    case 'ADD_TODO':
      retState = [...state, todo(undefined, action)];
      return retState;
    case 'TOGGLE_TODO':
      retState = state.map(t => todo(t, action));
      return retState;
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
// Reducers-------------

const Link = ({ active, children, onLinkClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault();
        onLinkClick();
      }}
    >
      {children}
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onLinkClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = ({ store }) => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const mapStateToListProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToListProps = dispatch => ({
  onTodoClick: id => dispatch(toggleTodo(id))
});
const VisibleTodoList = connect(mapStateToListProps, mapDispatchToListProps)(
  TodoList
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

let nextTodoId = 0;

const addTodo = text => {
  return { type: 'ADD_TODO', id: nextTodoId++, text };
};

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div className="form-group">
      <input className="form-control" ref={node => (input = node)} />
      <button
        className="btn"
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

const TodoComponent = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export { TodoComponent, todos, visibilityFilter };
