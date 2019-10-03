import fb from './firebaseApp'
const firebaseStorageUrl =
	'https://firebasestorage.googleapis.com/v0/b/xxxxxx-xxxxx-xxxxxx.xxxx'

const errorMessages = {
	login: {
		'auth/user-not-found': {
			email: 'Invalid email address',
		},
		'auth/wrong-password': {
			password: 'Invalid password, please try again',
		},
	},
	register: {
		'auth/email-already-in-use': {
			email: 'Email already in use',
		},
		'auth/invalid-email': {
			email: 'Email is not valid',
		},
		'auth/weak-password': {
			password: 'Password should be at least 6 characters',
		},
		'auth/operation-not-allowed': {
			email: 'Operation not allowed, check firebase console',
			password: 'Operation not allowed, check firebase console',
		},
	},
}

/* Register and reset password */
async function register({
	email,
	password,
	name,
	mnemonic,
	eventsInFutureNotificationTimeInSeconds,
}) {
	const { auth } = await fb()
	let loggedInUser
	await auth.setPersistence('session')
	try {
		loggedInUser = await auth.createUserWithEmailAndPassword(email, password)
	} catch (error) {
		return handleError('register', error)
	}
	if (loggedInUser && loggedInUser.user) {
		try {
			await createUser({
				userId: loggedInUser.user.uid,
				user: {
					role: 'user',
					name,
					email,
					mnemonic,
					eventsInFutureNotificationTimeInSeconds,
				},
			})
		} catch (e) {
			console.log(e)
			return null
		}
	}

	return {
		success: loggedInUser !== null,
	}
}

async function resetPassword(email) {
	try {
		const { auth } = await fb()
		await auth.sendPasswordResetEmail(email)
	} catch (error) {
		return handleError('resetPassword', error)
	}
}

/* Login and logout */
async function login(email, password) {
	let loggedInUser
	const { auth } = await fb()
	await auth.setPersistence('session')
	try {
		loggedInUser = await auth.signInWithEmailAndPassword(email, password)
	} catch (error) {
		return handleError('login', error)
	}
	return {
		success: loggedInUser !== null,
	}
}

async function signOut() {
	try {
		const { auth } = await fb()
		await auth.signOut()
	} catch (error) {
		return handleError('signOut', error)
	}
}

async function changePassword(newPassword) {
	const { auth } = await fb()
	let user = auth.currentUser
	await user.updatePassword(newPassword)
}

async function changeEmail(newEmail) {
	const { auth } = await fb()
	let user = auth.currentUser
	await user.updateEmail(newEmail)
}

async function createProfileStorage() {
	const { auth, storage } = await fb()
	const { uid } = auth.currentUser
	return storage.child(`images/profile/${uid}`)
}

function formatUrl(url) {
	return url.replace(/\//g, '%2F')
}

async function getProfilePic() {
	const { auth, storage } = await fb()
	const { uid } = auth.currentUser
	try {
		return await storage.child(`images/profile/${uid}`).getDownloadURL()
	} catch (e) {
		return null
	}
}

async function uploadProfilePic({ profilePic }) {
	try {
		const profileStorage = await createProfileStorage()
		await profileStorage.put(profilePic)
		return `${firebaseStorageUrl}${formatUrl(
			profileStorage.fullPath
		)}?alt=media`
	} catch (e) {
		throw e
	}
}

/* Status checkers */
async function getCurrentUser() {
	const { auth } = await fb()
	return auth.currentUser
}

/* Error handling */
function getErrorMessage(ctx, error) {
	return errorMessages[ctx][error.code]
}

function handleError(ctx, error) {
	return {
		success: false,
		error: getErrorMessage(ctx, error),
	}
}

/* User CRUD */
async function getUser({ userId = '' }) {
	const { db } = await fb()
	try {
		let user = await db
			.collection('users')
			.doc(userId)
			.get()

		return user.data()
	} catch (e) {
		return null
	}
}

async function createUser({ userId = '', user = {} }) {
	const { db } = await fb()
	await db
		.collection('users')
		.doc(userId)
		.set({
			...user,
			id: userId,
		})
}

async function updateUser({ userId = '', update = {} }) {
	const { db } = await fb()
	await db
		.collection('users')
		.doc(userId)
		.update(update)
}

/* Friends */
async function getFriends(userId, searchValue) {
	const { db } = await fb()
	let usersListResult = await db.collection(`users/${userId}/friends`).get()

	if (!usersListResult.size) {
		return []
	}

	if (!searchValue) {
		let usersList = []
		usersListResult.forEach(user => {
			usersList.push(user.data())
		})

		return usersList
	} else {
		const searchedUsers = []

		usersListResult.forEach(user => {
			const userData = user.data()

			if (
				userData.name &&
				userData.name.toLowerCase().includes(searchValue.toLowerCase())
			) {
				searchedUsers.push({
					...userData,
					id: user.id,
				})
			}
		})

		return searchedUsers
	}
}

async function searchUsersByName(
	currentUserFriends,
	searchValue,
	currentUserId
) {
	const { db } = await fb()
	let usersResult = await db.collection('users').get()
	const users = []

	usersResult.forEach(user => {
		const foundUser = currentUserFriends.find(
			currentUserFriend => currentUserFriend.userId === user.id
		)

		const userData = user.data()

		if (
			!foundUser &&
			currentUserId !== userData.id &&
			userData.name &&
			userData.name.toLowerCase().includes(searchValue.toLowerCase())
		) {
			users.push({
				...userData,
				id: user.id,
			})
		}
	})

	return users
}

async function addFriends(currentUserId, usersIds) {
	let usersToAdd = []

	for (const userId of usersIds) {
		const foundUser = await getUser({ userId })

		if (foundUser) {
			let { name = '', email = '' } = foundUser
			usersToAdd.push({
				name,
				email,
				userId,
			})
		}
	}

	for (const userToAdd of usersToAdd) {
		await addFriend({ userId: currentUserId, friend: userToAdd })
	}
}

async function addFriend({ userId, friend }) {
	const { db } = await fb()
	await db.collection(`users/${userId}/friends`).add(friend)
}

async function removeFriend(friendId, currentUserId) {
	const { db } = await fb()
	const friend = await db
		.collection(`users/${currentUserId}/friends`)
		.where('userId', '==', friendId)
		.get()

	await db
		.collection(`users/${currentUserId}/friends`)
		.doc(friend.docs[0].id)
		.delete()
}

export default {
	login,
	register,
	signOut,
	resetPassword,
	changeEmail,
	changePassword,
	getCurrentUser,

	getUser,
	updateUser,
	getProfilePic,
	uploadProfilePic,

	getFriends,
	searchUsersByName,
	addFriends,
	removeFriend,
}
