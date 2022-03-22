import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAsoXLqJL3KNMtlhGTX3lOww_d7pBV0Ixg',
    authDomain: 'midterm-77df9.firebaseapp.com',
    databaseURL:
        'https://midterm-77df9-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'midterm-77df9',
    storageBucket: 'midterm-77df9.appspot.com',
    messagingSenderId: '621118172940',
    appId: '1:621118172940:web:e419f92c0ff9cd84662329',
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);
