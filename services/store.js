import { create, Provider } from 'reworm'

const store = create({
	upcomingEvents: [],
	imageUrl: [],
	eventTimes: {},
	ticketsByEventId: [],
	myTickets: [],
})

export { Provider, store }
