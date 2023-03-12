# Alchemy Ethereum Functionality in TypeScript

This is a simple Node.js application that allows you to check out some of the Ethereum JSON-RPC functionalities using Alchemy. 

It includes three functions:

- `getBlockNumber(url: string): Promise<BlockNumberResponse>` - This function returns the current block number of the Ethereum blockchain.

- `getAccountBalance(address: string, url: string): Promise<AccountBalanceResponse>` - This function returns the balance of a single Ethereum account, given its address.

- `getManyAccountBalances(addresses: string[], url: string): Promise<AccountBalancesResponse>` - This function returns the balances of multiple Ethereum accounts, given their addresses.

Add your own `.env` file in the repo root to test it out.