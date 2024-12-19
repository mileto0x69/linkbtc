import * as bitcoin from "bitcoinjs-lib";

/**
 * Utility function to infer if a Bitcoin address is likely HD or non-HD.
 * @param address - The Bitcoin address to check.
 * @returns "HD" if the address is likely from an HD wallet, or "Non-HD" if otherwise.
 */
export function getAddressType(address: string): "HD" | "Non-HD" {
  if (
    address.startsWith("xpub") ||
    address.startsWith("ypub") ||
    address.startsWith("zpub")
  ) {
    return "HD";
  }

  try {
    bitcoin.address.fromBase58Check(address);

    if (address.startsWith("1")) {
      return "Non-HD";
    } else if (address.startsWith("3")) {
      return "HD";
    }
  } catch {
    try {
      bitcoin.address.fromBech32(address);
      if (address.startsWith("bc1")) {
        return "HD";
      }
    } catch {
      return "Non-HD";
    }
  }

  return "Non-HD";
}

export const calculatePercentageChange = (
  current: number,
  previous: number
) => {
  return isNaN(((current - previous) / previous) * 100)
    ? "0%"
    : (((current - previous) / previous) * 100).toFixed(2) + "%";
};

export const minifyAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};
