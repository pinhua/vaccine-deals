import './App.css';
import Home from "./Home";
import Details from './details';
import {collection, getFirestore} from 'firebase/firestore';
import { useFirestore, useFirebaseApp, FirestoreProvider, useFirestoreCollectionData } from 'reactfire';
import React, {  } from "react";
import {BrowserRouter as Router,
Switch,
Route,
Link,
useHistory
} from "react-router-dom";
function validMatch(restaurantProperties, userSelections){
  var optionsArray = []
  console.log(userSelections);
  if(userSelections == undefined || userSelections.length < 1){
    return true;
  }
  if(Array.isArray(restaurantProperties)){
    for (var i in userSelections){
      optionsArray.push(userSelections[i].value)
    }
    for(var j in restaurantProperties){
      
      if(optionsArray.includes(restaurantProperties[j])){
        
        console.log(restaurantProperties[j]);
        
        return true;
      }
      
    }
  }
  else{
    for (var i in userSelections){
      optionsArray.push(userSelections[i].value)
    }
    
    if(optionsArray.includes(restaurantProperties)){
     
      return true;
    }
  }
  
  return false;
}

function Restaurant(){
    const restaurantRef = collection(useFirestore(), 'Restaurant 1');
    const {status,data} = useFirestoreCollectionData(restaurantRef);
    let searchParams  = useHistory();
    let locationOptions = searchParams.location.state.locationOptions;
    let shopOptions = searchParams.location.state.shopOptions;
    let priceParam = parseInt(searchParams.location.state.price);
    if (status === 'loading') {
      return <p>Fetching restaurant...</p>;
    }
    return (
      <div>
      
        {
         data.map((restaurant) => {
           let restaurantDiv;
           console.log(restaurant.location);
           console.log(restaurant.type);
           console.log(shopOptions);
           console.log(locationOptions);
            if (validMatch(restaurant.type, shopOptions) && validMatch(restaurant.location, locationOptions) && (priceParam >= restaurant.minprice && priceParam <= restaurant.maxprice)) {
              
              restaurantDiv = (<div key = {restaurant.name}>
                
                <p>Name: {restaurant.name}</p>
                <p>Type: {restaurant.type}</p>
                <p>Offer: {restaurant.offer}</p>
                <p>Halal: {restaurant.halal ? 'yes':'no'}</p>
                <p>Minimum price: {restaurant.minprice}</p>
                <p>Maximum price: {restaurant.maxprice}</p>
                <img src={restaurant.image} />
                <p>Location: {restaurant.location}</p>
                <a href ={restaurant.map}>Map</a>
                <  Link to={'/details/' + restaurant.NO_ID_FIELD}>View more</Link>
                </div>)
            } /*else {
              restaurantDiv = (
              <div key={restaurant.name}>
                <p> Name {restaurant.name}</p>
                <p>Halal: {halalParam == restaurant.halal ? 'yes' : 'no'}</p> 
                <p>Type: {shopParam == restaurant.type ? 'yes' : 'no'}</p>
                <p>price: {(priceParam >= restaurant.minprice && priceParam <= restaurant.maxprice) ? 'yes' : 'no'}</p>
              </div>
              )
            }*/

            return restaurantDiv;
          }
         )
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
      <Route exact path="/" component={Home} />
        <Route path={'/results'}>
          <Restaurant />
        </Route>
        <Route path={'/details/:restaurantId'}>
          <Details />
        </Route>
        <Route path="*" component={Home} />
      </Switch>

      </Router>
    </div>
    </FirestoreProvider>
  );
  
}

export default App;