// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_IpiD3ZBJ5C8ridZAcoDkV-L82bPwR9M',
  authDomain: 'washables.firebaseapp.com',
  projectId: 'washables',
  storageBucket: 'washables.appspot.com',
  messagingSenderId: '238392109058',
  appId: '1:238392109058:web:e9ce8609e462a9922f1f1b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export { auth, db }
