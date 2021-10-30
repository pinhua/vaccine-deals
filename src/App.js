import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Results from "./results";
import Details from './details';
import {collection, getFirestore} from 'firebase/firestore';
import { useFirestoreDocData, useFirestore, useFirebaseApp, FirestoreProvider, useFirestoreCollectionData } from 'reactfire';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";


function Restaurant(){
    const restaurantRef = collection(useFirestore(), 'Restaurant 1');
    const {status,data} = useFirestoreCollectionData(restaurantRef);

    if (status === 'loading') {
      return <p>Fetching restaurant...</p>;
    }
    return (
      <div>
        {data.map((r) => ( console.log(r) )) }
        
        <p>Hello</p>
        {
         data.map((restaurant) => (
           
            <div>
              <p>Name: {restaurant.name}</p>
              <p>Type: {restaurant.type}</p>
              <p>Offer: {restaurant.offer}</p>
              <p>Halal: {restaurant.halal ? 'yes':'no'}</p>
              <p>Minimum price: {restaurant.minprice}</p>
              <p>Maximum price: {restaurant.maxprice}</p>
              <img src={restaurant.image} />
              <p>Location: {restaurant.location}</p>
              <a href ={restaurant.map}>Map</a>
              <Link to={'/details/' + restaurant.NO_ID_FIELD}>View more</Link>
            </div>
         ))

        }
      </div>
    );
}
function App(){

  
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
    <div>
      <h1>Vaccine deals</h1>
      <Router>
      <Switch>
        <Route path={'/Home'}>
        <Home />
        </Route>
        <Route path={'/results'}>
          <Restaurant />
        </Route>
        <Route path={'/details/:restaurantId'}>
          <Details />
        </Route>
      </Switch>
      </Router>
    </div>
    </FirestoreProvider>
  );
  
}

export default App;