import { type Chain } from "@covalenthq/client-sdk";
import { type GoldRushThemeMode } from "@covalenthq/goldrush-kit";

export interface GoldRushConfig {
  theme: {
    borderRadius: number;
    colors: {
      dark: {
        primary: string;
        background: string;
        foreground: string;
        secondary: string;
      };
      light: {
        primary: string;
        background: string;
        foreground: string;
        secondary: string;
      };
    };
    mode: GoldRushThemeMode;
  };
  brand: {
    title: string;
    subtitle: string;
    logo_url: string;
    github: string;
  };
  chains?: Chain[];
  gtag_id: string | null;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
