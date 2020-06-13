import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const FIREBASE_CONFIG = {
    appId: process.env.REACT_APP_FIREBASE_APPID,
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

console.log('Loading base initializeApp');

const app = firebase.initializeApp(FIREBASE_CONFIG);

firebase.setLogLevel('debug');

app.auth().useDeviceLanguage();
app.auth().settings.appVerificationDisabledForTesting = true;

console.log('Loading firestore');

export const firestore = app.firestore();

if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.warn(
        'Using local emulator firestore "%s"',
        process.env.FIRESTORE_EMULATOR_HOST
    );
    firestore.settings({
        host: process.env.FIRESTORE_EMULATOR_HOST,
        ssl: false,
    });
}

console.log('Firestore loaded!');

export { firebase };

export default app;
