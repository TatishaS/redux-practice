import React from 'react';
import { Paper, Divider, Button, List } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import Filter from './components/Filter';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  removeTask,
  toggleCheckbox,
  completeAll,
  clearAll,
  fetchTasks,
} from './redux/actions/tasks';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  React.useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* const [allCompleted, setAllCompleted] = React.useState(false); */

  const handleClickAdd = (text, checked) => {
    dispatch(addTask(text, checked));
  };

  const handleClickRemove = id => {
    const result = window.confirm('Do you really want to delete this task?');
    if (result) {
      dispatch(removeTask(id));
    }
  };

  const handleClickCheckbox = id => {
    dispatch(toggleCheckbox(id));
  };

  const handleClearAll = () => {
    const result = window.confirm('Do you really want to delete all tasks?');

    if (result) {
      dispatch(clearAll());
    }
  };

  const handleClickCompleteAll = () => {
    //setAllCompleted(!allCompleted);
    dispatch(completeAll());
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={handleClickAdd} />
        <Divider />
        <Filter />
        <Divider />
        <List>
          {state.tasks
            // eslint-disable-next-line array-callback-return
            .filter(task => {
              if (state.filter.filterBy === 'all') {
                return true;
              }
              if (state.filter.filterBy === 'completed') {
                return task.completed;
              }
              if (state.filter.filterBy === 'active') {
                return !task.completed;
              }
            })
            .map(obj => (
              <Item
                key={obj.id}
                text={obj.text}
                completed={obj.completed}
                onRemove={handleClickRemove}
                onChangeCheckbox={handleClickCheckbox}
                id={obj.id}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button
            onClick={handleClickCompleteAll}
            disabled={state.tasks.length === 0}
          >
            Выделить все
          </Button>
          <Button disabled={state.tasks.length === 0} onClick={handleClearAll}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
