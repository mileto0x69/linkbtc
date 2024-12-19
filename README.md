<div align="center">
  <a href="https://goldrush.dev/products/goldrush/"  target="_blank" rel="noopener noreferrer">
    <img alt="GoldRush Bitcoin Wallet & Portfolio UI template - powered by Covalent" src="https://www.datocms-assets.com/86369/1731711128-goldrush-bitcoin-wallet-portfolio-template.png" style="max-width: 100%;"/>
  </a>
  <br />

[![GitHub license](https://img.shields.io/github/license/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/commits/master)
[![GitHub contributors](https://img.shields.io/github/contributors/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/pulls)
[![GitHub stars](https://img.shields.io/github/stars/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/covalenthq/goldrush-bitcoin-wallet-ui)](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/network/members)

</div>

<br/>
<h1 align="center">Beautifully designed Bitcoin Wallet & Portfolio UI template.</h1>

<div align="center">
Powered by <span><a href="https://github.com/covalenthq/goldrush-kit">GoldRush UI Kit.</a></span> Open-source & Customizable.
</div>

## View Live Template

<a href="https://goldrush-bitcoin-wallet-ui.vercel.app/">https://goldrush-bitcoin-wallet-ui.vercel.app</a>

Explore a live deployment of the template, showcasing its features and UI components in action.

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcovalenthq%2Fgoldrush-bitcoin-wallet-ui&env=NEXT_PUBLIC_GOLDRUSH_API_KEY&envDescription=Visit%20Covalent%20to%20sign%20up%20for%20an%20API%20key&envLink=https%3A%2F%2Fwww.covalenthq.com%2Fplatform%2Fauth%2Fregister%2F)

Quickly create your own deployment on Vercel with one click. This will set up a clone of the template, ready to be customized. This will also be unlinked from the original template.

> Note: You will need your [GoldRush API key](https://goldrush.dev/platform/apikey) to set the `NEXT_PUBLIC_GOLDRUSH_API_KEY` environment variable.

## Local Setup

This repo is set up as a _public template_ so you can either **Fork** to create a linked repo to pull in updates, or select **Use this template** to create an unlinked copy that will not inherit any issues, PRs or updates from the original.

1. Install package dependencies using: `npm install`.
2. Create an `.env.local` in your root directory and add your [GoldRush API key](https://goldrush.dev/platform/apikey):
   ```
   NEXT_PUBLIC_GOLDRUSH_API_KEY = "<YOUR_API_KEY>"
   ```
3. Run the template with:
   ```
   npm run dev
   ```

## Customize

This template can be quickly customized from `goldrush.config.ts`. By default, it looks like:

```ts
import { type GoldRushConfig } from "@/utils/types/shared.types";

export const goldrushConfig: GoldRushConfig = {
  brand: {
    title: "GoldRush",
    subtitle: "Bitcoin Wallet & Portfolio UI",
    logo_url: "/goldrush-logo.png",
    github: "https://github.com/covalenthq/goldrush-bitcoin-wallet-ui",
  },
  theme: {
    borderRadius: 6,
    colors: {
      dark: {
        primary: "#FF4C8B",
        background: "#000426",
        foreground: "#FFFFFF",
        secondary: "#868E96",
      },
      light: {
        primary: "#FF4C8B",
        background: "#FFFFFF",
        foreground: "#1C2024",
        secondary: "#868E96",
      },
    },
    mode: "light",
  },
  gtag_id: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || null,
};

export default goldrushConfig;
```

1. `brand`: This objects sets the title and logo in the top left `nav` bar.

   <img src="./repo-static/brand-example.png">

   A 40x40px logo size is recommended.

2. `theme`: This object is an extension of the [GoldRush UI Kit](https://github.com/covalenthq/goldrush-kit) theme config. Explore the theme settings [here](https://goldrush-kit.vercel.app/?path=/story/theme-config--theme-config).

3. **gtag_id**: This is an optional [Google Analytics](https://developers.google.com/analytics) tag ID (format; `G-**********`) for tracking traffic to your Block Explorer.

## Features

1. **Real-time Wallet Details**: Provides up-to-date information on bitcoin transactions, and balances for a wallet address in real time, giving users the latest data.
2. **Ready-to-use customizable template**: Jumpstart your dApp journey with a beautifully designed UI that’s both intuitive and engaging.
3. **HD and Non-HD Address Support**: Supports both HD and Non-HD bitcoin addresses.
4. **UI Template**: The GoldRush Bitcoin Wallet & Portfolio UI can be customized with different colors and modes per deployment.

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to check the [issues](https://github.com/covalenthq/goldrush-bitcoin-wallet-ui/issues) page.

## Show Your Support

Give us a ⭐️ if this project helps you!

## License

This project is [MIT](./LICENSE) licensed.
