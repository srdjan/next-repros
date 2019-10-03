export default async function loadFirebase() {
	const firebase = await import('@firebase/app')
	await import('@firebase/auth')
	await import('@firebase/firestore')
	await import('@firebase/storage')

	let fb = firebase.firebase

	let firebaseApp
	if (!fb.apps.length) {
		firebaseApp = fb.initializeApp({
			projectId: '',
			apiKey: '',
			authDomain: '',
			databaseURL: '',
			storageBucket: '',
			messagingSenderId: 111122,
		})
	} else {
		firebaseApp = fb.app()
	}

	const auth = firebaseApp.auth()
	const storage = fb.storage().ref()
	const db = firebaseApp.firestore()
	db.settings({})

	const { firestore } = fb
	return { auth, db, firestore, storage }
}
