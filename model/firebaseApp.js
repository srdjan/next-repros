export default async function loadFirebase() {
	const firebase = await import('firebase/app')
	await import('firebase/auth')
	await import('firebase/firestore')
	await import('firebase/storage')

	let firebaseApp
	if (!firebase.apps.length) {
		firebaseApp = firebase.initializeApp({
			projectId: '',
			apiKey: '',
			authDomain: '',
			databaseURL: '',
			storageBucket: '',
			messagingSenderId: 111122,
		})
	} else {
		firebaseApp = firebase.app()
	}

	const auth = firebaseApp.auth()
	const storage = firebase.storage().ref()
	const db = firebaseApp.firestore()
	db.settings({})

	return { auth, db, storage }
}
