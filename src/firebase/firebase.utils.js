import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyC1lgXXTQt23w084P-X1VcjaJINk_SkChc",
	authDomain: "ecommerce-379b3.firebaseapp.com",
	databaseURL: "https://ecommerce-379b3.firebaseio.com",
	projectId: "ecommerce-379b3",
	storageBucket: "ecommerce-379b3.appspot.com",
	messagingSenderId: "278588882210",
	appId: "1:278588882210:web:78b1e66577e0585b27397b",
	measurementId: "G-9B3FSY1LZW"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
