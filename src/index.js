import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './components/App';
// import thunk from 'redux-thunk';
import rootReducer from  './reducers';
// import { StoreContext } from '../index';
// function logger(obj,next,action)
// logger (obj)(next)(action)
// const logger= function ({dispatch,getState}) {
//   return function(next){
//     return function(action){
//       // middleware code
//       console.log('ACTION_TYPE=',action.type);
//       next(action);
//     }
//   }
// }

const logger=({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  // console.log('ACTION_TYPE=',action.type);
       next(action);
}

 const thunk=({dispatch,getState})=>(next)=>(action)=>{
   //logger code
   if(typeof action==='function'){
     action(dispatch);
     return;
   }
   next(action);
}


const store=createStore(rootReducer,applyMiddleware(logger,thunk));
// export const StoreContext=createContext();
 console.log('store',store);
//  class Provider extends React.Component{
//    render(){
//      const {store}=this.props;
//      return <StoreContext.Provider value={store}>
//        {this.props.children}
//      </StoreContext.Provider>
//    }
//  }
// console.log('BEFORE STATE',store.getState()) // initial state of store

// store.dispatch({
//   type:  'ADD MOVIES',           // dispatch allows sending action to reducer
//   movies: [{name:'SUPERMAN'}]
// })
// console.log('AFTER STATE',store.getState())  // after state of reducer
ReactDOM.render(

  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
 ,
  document.getElementById('root')
);


