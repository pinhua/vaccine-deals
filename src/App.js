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
  if(userSelections === undefined || userSelections.length < 1){
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
    let minPrice = parseInt(searchParams.location.state.minPrice)
    let maxPrice = parseInt(searchParams.location.state.maxPrice)
    if (status === 'loading') {
      return <p>Fetching restaurant...</p>;
    }
    return (
      <div>
      
        {
         data.map((restaurant) => {
           let restaurantDiv;
           console.log(searchParams.location.state)
            if (validMatch(restaurant.type, shopOptions) && validMatch(restaurant.location, locationOptions) && (minPrice<= restaurant.minprice && maxPrice >= restaurant.maxprice)) {
              
              restaurantDiv = (<div key = {restaurant.name} className='entry'>
                <img src={restaurant.image} />
                <div className='details'>
                <p>Name: {restaurant.name}</p>
                <p>Type: {restaurant.type.join(', ')}</p>
                <p>Offer: {restaurant.offer}</p>
                <p>${restaurant.minprice}-${restaurant.maxprice}</p>
                
                
                <p>Location: {restaurant.location}</p>
                <a href ={restaurant.map}>Map</a>
                <  Link to={'/details/' + restaurant.NO_ID_FIELD}>View more</Link>
                </div>
                </div>)
            }/* else {
              restaurantDiv = (
              <div key={restaurant.name}>
                <p> Name {restaurant.name}</p>
                <p>Shop Options: {validMatch(restaurant.type, shopOptions) ? 'yes' : 'no'}</p> 
                <p>Location Options: {validMatch(restaurant.location, locationOptions) ? 'yes': 'no'}</p>
                <br />
                <p>Minimum price: {restaurant.minprice}</p>
                <p>Maximum price: {restaurant.maxprice}</p>
                <br />
                <p>Minimum price selection: {minPrice}</p>
                <p>Maximum price selection: {maxPrice}</p>
                <br />
                <p>price: {(minPrice <= restaurant.minprice && maxPrice >= restaurant.maxprice) ? 'yes' : 'no'}</p>
                <br />
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
function Results(){
  let history = useHistory();
  let locationOptions = history.location.state.locationOptions;
  let shopOptions = history.location.state.shopOptions;
  let minPrice = parseInt(history.location.state.minPrice)
  let maxPrice = parseInt(history.location.state.maxPrice)
  var locationsArray = []
  var shopArray=[]
  for (var i in locationOptions){
    locationsArray.push(locationOptions[i].value)
  }
  for (var j in shopOptions){
    shopArray.push(shopOptions[j].value)
  }
  return(
    <div>
       <h2>Results</h2>
       <p className='resultHeader'>You've searched for restaurants at {locationsArray.length>=1 ? locationsArray.join(', '): 'all areas'} with  {shopArray.length>=1 ? 'options of '+ shopArray.join(', '): 'no options selected'} and price range of ${minPrice} to ${maxPrice}.</p><br />
       <button onClick={() => history.goBack()}>New Search</button>
          <br /><h2>Here are your results:</h2>
          

          <Restaurant />
    </div>
  )
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
          <Results />
          
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