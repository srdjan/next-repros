let firebaseApp, auth, db, firestore

export default async function loadFirebase () {
  if (firebaseApp) return { auth, db, firestore }

  const firebase = await import('@firebase/app')
  await import('@firebase/auth')
  await import('@firebase/firestore')

  const fb = firebase.firebase
  if (!fb.apps.length) {
    firebaseApp = fb.initializeApp({
      projectId: 'app-0000',
      apiKey: 'AIHlkjdslsjJLLjsjsdlkckhjlslkh',
      authDomain: 'app-0000.firebaseapp.com',
      databaseURL: 'https://app-0000.firebaseio.com',
      messagingSenderId: 123456789000
    })
  } else {
    firebaseApp = fb.app()
  }

  auth = firebaseApp.auth()
  db = firebaseApp.firestore()
  db.settings({})

  firestore = fb.firestore
  return { auth, db, firestore }
}
