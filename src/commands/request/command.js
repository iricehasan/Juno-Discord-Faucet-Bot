const { SlashCommandBuilder } = require('discord.js');
const { FaucetBot } = require('../../FaucetBot');

const faucetBot = new FaucetBot();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('request')
		.setDescription('Request tokens from faucet!')
		.addStringOption(option =>
			option.setName('juno_address')
				.setDescription('The Juno address to request tokens for')
				.setRequired(true)),
	async execute(interaction) {
		const junoAddress = interaction.options.getString('juno_address');
				
		await interaction.deferReply();

		try {
			const txHash = await faucetBot.requestTokens(junoAddress);
			const txLink = `https://www.mintscan.io/juno-testnet/tx/${txHash}`;
			await new Promise(resolve => setTimeout(resolve, 2000));

			await interaction.editReply(`Hi @${interaction.user.username}! Here is your tx: ${txLink}`);
		} catch (error) {
			await interaction.editReply(`Failed to request tokens. Error: ${error.message}`);
		}
	},
};
