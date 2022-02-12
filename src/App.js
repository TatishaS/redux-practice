import React from 'react';

import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function reducer(state, action) {
  console.log(state, action);
  if (action.type === 'ADD_TASK') {
    return [
      ...state,
      {
        id: state.length + 1,
        text: action.text,
        completed: action.completed,
      },
    ];
  }

  return state;
}

function App() {
  const [inputValue, setInputValue] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, []);

  const addTask = () => {
    dispatch({
      type: 'ADD_TASK',
      text: inputValue,
      completed: completed,
    });
    setInputValue('');
    setCompleted(false);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onClickAdd={addTask}
          onChangeInput={setInputValue}
          value={inputValue}
          completed={completed}
          setCompleted={setCompleted}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map(obj => (
            <Item text={obj.text} key={obj.id} completed={obj.completed} />
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
