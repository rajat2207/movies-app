import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// function logger(obj,next,action) (curried form)
// logger(abj)(next)(action) - internal call by redux
const logger = ({dispatch,getState}) => {
  return (next) => {
    return (action) => {
      //middleware code
      if(typeof action !== 'function'){
        console.log('ACTION_TYPE = ',action.type);
      }
      next(action);
    }
  }
}

// const thunk = ({dispatch,getState}) => {
//   return (next) => {
//     return (action) => {
//       //middleware code
//       if(typeof action === 'function'){
//         action(dispatch);
//         return;
//       }
//       next(action);
//     }
//   }
// }

const store=createStore(rootReducer,applyMiddleware(logger,thunk));
console.log('store', store);

export const storeContext = createContext();

class Provider extends React.Component{
  render(){
    const {store} = this.props;
    return <storeContext.Provider value={store}>
      {this.props.children} 
    </storeContext.Provider>
  }
  // children are the html tags and components which are present between the opening and closing tags of the class
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);


