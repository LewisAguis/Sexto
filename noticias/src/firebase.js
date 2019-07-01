import * as firebase from "firebase";
import 'firebase/firestore';


const config = { 
   apiKey: "AIzaSyAzkiWWcCFG5EIBVVcV_YCjxS3Zt9xJ51c",
   authDomain: "noticias-2c4f2.firebaseapp.com",
   databaseURL: "https://noticias-2c4f2.firebaseio.com",
   projectId: "noticias-2c4f2",
   storageBucket: "noticias-2c4f2.appspot.com",
   messagingSenderId: "814382247259",
   appId: "1:814382247259:web:d46691395a61a72d"
};

export default !firebase.apps.length ? firebase.initializeApp(config).firestore() : firebase.app().firestore();