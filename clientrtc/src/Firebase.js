import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
/*importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js');*/


/*
    initialize firebase
*/
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
    apiKey: "AIzaSyC1zsvjhH3lFvryJAxxlKnWMSQg2GXV0Ck",
    authDomain: "ouluxxwebsiteregistration.firebaseapp.com",
    projectId: "ouluxxwebsiteregistration",
    storageBucket: "ouluxxwebsiteregistration.appspot.com",
    messagingSenderId: "110377777379",
    appId: "1:110377777379:web:c156afaf200bf3c5166dd6",
    measurementId: "G-SWY6J6MZ5R"
  };
  // Initialize Firebase
  /*firebase.initializeApp(firebaseConfig);*/
/*  firebase.analytics();*/
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
/*export default firebase;*/
