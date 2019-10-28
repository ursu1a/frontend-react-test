import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import {auth} from "../reducers/auth";
import App from '../components/App';

const rootReducer = combineReducers({
   auth: auth,
   form: formReducer
});

const testStore=createStore(rootReducer);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
     <Provider store={testStore}>
        <App />
      </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
