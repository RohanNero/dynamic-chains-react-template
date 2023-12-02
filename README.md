## 🍦 Vanilla Dynamic Chains React Template

💭 This repo showcases a simple reusable header template for developing web3 apps with nextjs 13 app routing.

![Alt text](./public/image.png)

### 💎 Features

The header consists of:

1. A custom rainbow connect button that allows the user to connect to a handful of different wallets with support for additional ones being relatively simple to add.
2. An option to display the user's address in the form of a QR code.
3. A button linking the user to the chain's block explorer.
4. An interactive dropdown menu containing a list of the apps supported chains that you can easily switch to by a single click.

### 🧑‍🔧 Under the hood

This project was built using a handful of components from existing tools and frameworks such as:

1. [Viem](https://viem.sh/docs/getting-started.html) 🌤️
2. [Wagmi](https://wagmi.sh/) 🌥️
3. [Rainbowkit](https://www.rainbowkit.com/) 🌈
4. [Scaffold-eth-2](https://docs.scaffoldeth.io/) 🏗️

Special thanks to [Avelous](https://twitter.com/Avelouseth) for his [ETH-Splitter header](https://github.com/Avelous/Eth-Splitter/blob/master/packages/nextjs/components/Header.tsx#L119-L147) which served as a big source of inspiration for this project!

And Special thanks to [Carlos](https://github.com/carletex) and [Shiv Blonde](https://twitter.com/ShivBhonde) for their major contributions to Scaffold-eth 2, which a huge chunk of the code here was pulled from.
