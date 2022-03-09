const initialState = [];

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;

    case 'ADD_TASK':
      return [
        ...state,
        {
          id: state.length + 1,
          text: action.payload.text,
          completed: action.payload.checked,
        },
      ];
    case 'REMOVE_TASK':
      const newState = state.filter(obj => {
        return obj.id !== action.payload;
      });
      return newState;

    case 'TOGGLE_CHECKBOX':
      return state.map(obj => {
        if (obj.id === action.payload) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      });

    case 'COMPLETE_ALL':
      return state.map(obj => ({
        ...obj,
        completed: true,
      }));

    case 'CLEAR_ALL_TASKS':
      return [];

    default:
      return state;
  }
}
