import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCycW5fHnKBwG6S8PMxpbH0i7RWn_0HAH0',
    authDomain: 'unit2project-vue-js.firebaseapp.com',
    databaseURL: 'https://unit2project-vue-js.firebaseio.com',
    projectId: 'unit2project-vue-js',
    storageBucket: 'unit2project-vue-js.appspot.com',
    messagingSenderId: '536887217381',
    appId: '1:536887217381:web:a842ddefcf7ef01256580c'
};
firebase.initializeApp(config);

export const db = firebase.firestore();