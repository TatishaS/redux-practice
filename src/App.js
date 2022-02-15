import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    return {
      ...state,
      tasks: [
        ...state.tasks,
        {
          id: state.tasks.length + 1,
          text: action.payload.text,
          completed: action.payload.checked,
        },
      ],
    };
  }

  if (action.type === 'REMOVE_TASK') {
    console.log(action.payload);
    const newState = state.tasks.filter(obj => {
      return obj.id !== action.payload;
    });
    return {
      ...state,
      tasks: newState,
    };
  }

  if (action.type === 'TOGGLE_CHECKBOX') {
    return {
      ...state,
      tasks: state.tasks.map(obj => {
        if (obj.id === action.payload) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      }),
    };
  }

  if (action.type === 'CLEAR_ALL_TASKS') {
    return {
      ...state,
      tasks: [],
    };
  }

  if (action.type === 'MARK_ALL_COMPLETED') {
    return {
      ...state,
      tasks: state.tasks.map(obj => ({
        ...obj,
        completed: true,
      })),
    };
  }
  if (action.type === 'SET_FILTER') {
    return {
      ...state,
      filterBy: action.payload,
    };
  }
  return state;
};

const filterIndex = {
  all: 0,
  active: 1,
  completed: 2,
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    // Change state from Array to Object with key 'tasks'
    tasks: [],
    filterBy: 'completed',
  });
  const [allCompleted, setAllCompleted] = React.useState(false);

  const addTask = (text, checked) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        text,
        checked,
      },
    });
  };

  const onRemoveItem = id => {
    const result = window.confirm('Do you really want to delete this task?');
    if (result) {
      dispatch({
        type: 'REMOVE_TASK',
        payload: id,
      });
    }
  };

  const toggleCheckbox = id => {
    dispatch({
      type: 'TOGGLE_CHECKBOX',
      payload: id,
    });
  };

  const clearAllTasks = () => {
    const result = window.confirm('Do you really want to delete all tasks?');

    if (result) {
      dispatch({
        type: 'CLEAR_ALL_TASKS',
      });
    }
  };

  const markAllCompleted = () => {
    setAllCompleted(!allCompleted);
    dispatch({
      type: 'MARK_ALL_COMPLETED',
    });
  };

  const setFilter = (_, newIndex) => {
    const status = Object.keys(filterIndex)[newIndex];
    dispatch({
      type: 'SET_FILTER',
      payload: status,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs onChange={setFilter} value={filterIndex[state.filterBy]}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.tasks
            .filter(task => {
              if (state.filterBy === 'all') {
                return true;
              }
              if (state.filterBy === 'completed') {
                return task.completed;
              }
              if (state.filterBy === 'active') {
                return !task.completed;
              }
            })
            .map(obj => (
              <Item
                key={obj.id}
                text={obj.text}
                completed={obj.completed}
                onRemove={onRemoveItem}
                onChangeCheckbox={toggleCheckbox}
                id={obj.id}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={markAllCompleted} disabled={state.length === 0}>
            {allCompleted ? 'Снять отметки' : 'Отметить всё'}
          </Button>
          <Button disabled={state.length === 0} onClick={clearAllTasks}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
