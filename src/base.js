import Rebase from 're-base'
import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBhUVVJFRB0NRJuv0JF69RWibKEyNNbgtM",
    authDomain: "vaccine-deals.firebaseapp.com",
    databaseURL: "https://vaccine-deals-default-rtdb.asia-southeast1.firebasedatabase.app",
    

});
const base = Rebase.createClass(firebaseApp.database());
export {firebaseApp};
export default base;