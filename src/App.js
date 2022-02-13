import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function App() {
  const reducer = (state, action) => {
    if (action.type === 'ADD_TASK') {
      return [
        ...state,
        {
          id: state.length + 1,
          text: action.payload.text,
          completed: action.payload.checked,
        },
      ];
    }

    if (action.type === 'REMOVE_TASK') {
      console.log(action.payload);

      const result = window.confirm('Do you really want to delete this task?');
      if (result) {
        const newState = state.filter(obj => {
          return obj.id !== action.payload;
        });
        return newState;
      }
    }
    return state;
  };
  const [state, dispatch] = React.useReducer(reducer, []);

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
    dispatch({
      type: 'REMOVE_TASK',
      payload: id,
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
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map(obj => (
            <Item
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onRemove={onRemoveItem}
              id={obj.id}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
