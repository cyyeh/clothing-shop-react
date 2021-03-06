import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBbGztqVNH_6qScwqdmmm3A0kv1AUJBscw",
  authDomain: "e-commerce-db-12066.firebaseapp.com",
  projectId: "e-commerce-db-12066",
  storageBucket: "e-commerce-db-12066.appspot.com",
  messagingSenderId: "194344681045",
  appId: "1:194344681045:web:6c54e44fecc6de7eee1edc",
  measurementId: "G-301B5XF00C"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase