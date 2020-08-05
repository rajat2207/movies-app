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

// const connectedAppComponent = connect(callback)(App);
// function callback(state) {
//   return {
//     movies: state.movies,
//     search: state.search,
//   };
// }
export function connect (callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => { this.forceUpdate() });
        //unsubscribe is a function returned when subcribe will be called.This function should be called when the component is destroyed in order to prevent memory leaks
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        return (
          <Component
            {...dataToBePassedAsProps} /* ...(spread operator will pass the the content of callback as props) */
            dispatch={store.dispatch}
          />
        );
      }
    }

    //since we need access to the store in order to re-render the component on subscribing, we wrap it further in a wrapper
    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <storeContext.Consumer>
            {(store) => (
              <ConnectedComponent store={store} />
            )}
          </storeContext.Consumer>
        );
      }
    }
    
    return ConnectedComponentWrapper;
  }
}

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider> , 
  document.getElementById('root')
);


