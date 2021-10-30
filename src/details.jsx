import React, {Component} from "react";
import { useHistory, useParams } from "react-router";
import { doc, getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';
function Details() {
  let {restaurantId} = useParams();
  let history = useHistory();
  const restaurantRef = doc(useFirestore(), 'Restaurant 1', restaurantId);
  const {status,data} = useFirestoreDocData(restaurantRef);
  if (status === 'loading') {
    return <p>Fetching restaurant...</p>;
  }
  return (
    <div>
      
      
      <p>Hello</p>
      {
       
         
          <div>
            <p>Name: {data.name}</p>
            <p>Type: {data.type}</p>
            <p>Offer: {data.offer}</p>
            <p>Halal: {data.halal ? 'yes':'no'}</p>
            <p>Minimum price: {data.minprice}</p>
            <p>Maximum price: {data.maxprice}</p>
            <img src={data.image} />
            <p>Location: {data.location}</p>
            <a href ={data.map}>Map</a>
            <button onClick={() => history.goBack()}>Back</button>
          </div>
       

      }
    </div>
  );


    
}
export default Details