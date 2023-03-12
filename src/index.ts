import axios from "axios";

// grab the API key from the .env
require('dotenv').config();
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`;

interface BlockNumber {
    jsonrpc: string;
    id: number,
    result: string
}

interface BlockNumberResponse {
    data: BlockNumber
}

interface AccountBalance {
    jsonrpc: string,
    id: number,
    result: string
}

interface AccountBalanceResponse {
    data: AccountBalance
}

interface AccountBalancesResponse {
    data: AccountBalance[]

}

export async function getBlockNumber(url: string): Promise<BlockNumberResponse> {
    const response: BlockNumberResponse = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber"
    })

    return response;
}

export async function getAccountBalance(address: string, url: string): Promise<AccountBalanceResponse> {
    const response: AccountBalanceResponse = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address]
    })

    return response;

}

export async function getManyAccountBalances(addresses: string[], url: string): Promise<AccountBalancesResponse> {
    const batch = addresses.map((addr, i) => ({
        jsonrpc: "2.0",
        id: i,
        method: "eth_getBalance",
        params: [addr]
    }))

    const response: AccountBalancesResponse = await axios.post(url, batch);

    return response


}

(async () => {
    const blockNumber: BlockNumberResponse = await getBlockNumber(ALCHEMY_URL);
    console.log(blockNumber.data.result)
    const balance: AccountBalanceResponse = await getAccountBalance("0xd52C269b5138537726fa178ab12e24F46f6ea21d", ALCHEMY_URL);
    console.log(balance.data.result)
    const balances: AccountBalancesResponse = await getManyAccountBalances(["0xd52C269b5138537726fa178ab12e24F46f6ea21d"], ALCHEMY_URL);
    console.log(balances.data.reduce((p,c) => p + parseInt(c.result), 0))
})()