# Maidcoin App
<a href="https://github.com/maidcoingit/maidcoin-app">
    <img src="https://badgen.net/badge/status/dev/red"></a>
<a href="https://discord.gg/ZMWNjs6F3V">
    <img src="https://img.shields.io/discord/862948397354582026?logo=discord"
        alt="chat on Discord"></a>
<a href="https://twitter.com/intent/follow?screen_name=maid_coin">
    <img src="https://img.shields.io/twitter/follow/maid_coin?style=social&logo=twitter"
        alt="follow on Twitter"></a>

An open source app for Maidcoin -- an upcoming DeFi project with elements of NFT collecting and gamification.
* Website: https://www.maidcoin.org
* App: https://app.maidcoin.org
* Docs: https://medium.com/maid-coin
* Twitter: https://twitter.com/maid_coin
* Reddit: https://www.reddit.com/r/Maidcoin/
* Email: contact@maidcoin.org
* Discord: https://discord.gg/ZMWNjs6F3V
* OnePager: https://uploads-ssl.webflow.com/60ccaa29429d9f0872f405d8/6109541722fc1c9a912452bc_MaidCoinOnePager.pdf

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

We use [yarn](https://yarnpkg.com) in our infrastructure, so we decided to go with yarn in the README.
Please install yarn globally if you haven't already.

### Environment variables
The app grabs environment variables from the `.env` file. Copy our template to your own local file:
```
cp .env.example .env
```

To execute transactions, you'll need to create an [Infura](https://infura.io) project and set the project ID in the `.env` you've just created:
```
INFURA_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
Once done, you'll need to restart the app if it's already running.

### Installing and running

Install dependencies for the project:
```
yarn install
```

To start in development environment:
```
yarn webpack-dev
```

To start in development environment:
```
yarn webpack-prod
```

## Built With

### [SkyNode](https://github.com/Hanul/skynode)
A JS library for building user interfaces that supports customized DOM manipulation
  
### [Typescript](https://www.typescriptlang.org/)
TypeScript is an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions.

### [Webpack](https://webpack.js.org/)
Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

### [Ethers](https://ethers.org/)
The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.

### [WalletConnect](https://walletconnect.org/)
WalletConnect is an open source protocol for connecting decentralised applications to mobile wallets with QR code scanning or deep linking.

## License
[MIT](LICENSE)
