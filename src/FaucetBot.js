const axios = require('axios');

class FaucetBot {
    constructor() {}

    async requestTokens(junoAddress) {
        const url = `https://faucet.testnet.chaintools.tech/uni-6/${junoAddress}`;
        try {
            const response = await axios.get(url);
            return response.data.result.transactionHash;

        } catch (error) {
            if (error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                console.error('Error requesting tokens:', error);
                throw new Error('Failed to request tokens');
            }
        }
    }
}

module.exports = { FaucetBot };
