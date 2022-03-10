import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { tasksReducer } from './reducers/tasks';
import { filterReducer } from './reducers/filter';

const rootReducer = combineReducers({
  filter: filterReducer,
  tasks: tasksReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
