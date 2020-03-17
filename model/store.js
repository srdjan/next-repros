import {createStoreon} from 'storeon'

const myTickets = store => {
	store.on('@init', () => ({ myTickets: [] }))

	store.on('myTickets/set', (state, myTickets) => {
		return {
			...state,
			myTickets,
		}
	})
}

const ticketsByEventId = store => {
	store.on('@init', () => ({ ticketsByEventId: [] }))

	store.on('ticketsByEventId/set', (state, ticketsByEventId) => {
		return {
			...state,
			ticketsByEventId,
		}
	})
}

export const store = createStoreon([myTickets, ticketsByEventId])

