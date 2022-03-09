export const addTask = (text, checked) => {
  return {
    type: 'ADD_TASK',
    payload: {
      text,
      checked,
    },
  };
};

export const removeTask = id => ({
  type: 'REMOVE_TASK',
  payload: id,
});

export const toggleCheckbox = id => ({
  type: 'TOGGLE_CHECKBOX',
  payload: id,
});

export const completeAll = () => ({
  type: 'COMPLETE_ALL',
});

export const clearAll = () => ({
  type: 'CLEAR_ALL_TASKS',
});

export const fetchTasks = () => async dispatch => {
  const resp = await fetch('https://61f960e969307000176f71f2.mockapi.io/tasks');
  if (resp.ok) {
    const data = await resp.json();
    dispatch({
      type: 'SET_TASKS',
      payload: data,
    });
  }
};
