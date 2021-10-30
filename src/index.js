import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { doc, getFirestore } from 'firebase/firestore';
import {createStore} from 'redux';
import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';
import {Provider} from 'react-redux';
const firebaseConfig = {
  apiKey: "AIzaSyBhUVVJFRB0NRJuv0JF69RWibKEyNNbgtM",
  authDomain: "vaccine-deals.firebaseapp.com",
  databaseURL: "https://vaccine-deals-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vaccine-deals",
  storageBucket: "vaccine-deals.appspot.com",
  messagingSenderId: "418231703148",
  appId: "1:418231703148:web:008309a5c0d3984e3bea49",
  measurementId: "G-4JDD1FCEJQ"
};
function storeReducer() {

}
const store = createStore(storeReducer);
ReactDOM.render(
  <Provider store={store}>
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
