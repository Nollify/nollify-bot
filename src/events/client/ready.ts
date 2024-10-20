import { Events, Client } from 'discord.js'
import { loadCommands } from '../../handlers/commands'
import { loadModals } from '../../handlers/modals'
import { loadSelectMenus } from '../../handlers/selectMenus'
import Event from '../../@types/event.t'

export default {
	name: Events.ClientReady,
	description: 'The client is ready to start working',
	once: true,
	async execute(client: Client) {
		await loadCommands(client)
		loadModals(client)
		loadSelectMenus(client)

		console.log(`[🤖 Bot] Logged in as ${client.user?.displayName}`)
	}
} as Event
