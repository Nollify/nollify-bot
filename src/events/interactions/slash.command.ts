import { Events, ChatInputCommandInteraction, Client, EmbedBuilder, Colors, GuildMemberRoleManager } from 'discord.js'
import { commands } from '../../handlers/commands'
import Event from '../../@types/event.t'

export default {
	name: Events.InteractionCreate,
	description: 'Slash command handler',
	async execute(interaction: ChatInputCommandInteraction, client: Client) {
		if (!interaction.isChatInputCommand()) return
		const embed = new EmbedBuilder().setTimestamp()
		const command = commands.get(interaction.commandName)
		if (!command)
			await interaction.reply({ embeds: [embed.setDescription('This command does not exist.').setColor(Colors.Red)], ephemeral: true })
		else if (command.developerOnly && interaction.user.id !== client.application?.owner?.id)
			await interaction.reply({ embeds: [embed.setDescription('This command is for developers only.').setColor(Colors.Red)], ephemeral: true })
		else
			command.execute && command.execute(interaction, client)
	}
} as Event
