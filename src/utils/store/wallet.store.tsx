"use client";

import { GoldRushProvider, GoldRushThemeType } from "@covalenthq/goldrush-kit";

import "@covalenthq/goldrush-kit/styles.css";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import kit from "@/../goldrush.config";

interface WalletContextType {
  themeKit: GoldRushThemeType;
  setThemeKit: React.Dispatch<React.SetStateAction<GoldRushThemeType>>;
}

export const WalletContext = createContext<WalletContextType>(
  {} as WalletContextType
);

interface WalletUiContextProps {
  children: ReactNode;
}

export const WalletUiContext: React.FC<WalletUiContextProps> = ({
  children,
}) => {
  const [themeKit, setThemeKit] = useState<GoldRushThemeType>(kit.theme);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("goldrush_theme", JSON.stringify(themeKit));
    }
  }, [isClient, themeKit]);

  const contextValue = useMemo(
    () => ({
      themeKit,
      setThemeKit,
    }),
    [themeKit]
  );

  if (!isClient) {
    return <div></div>;
  }

  return (
    <GoldRushProvider
      apikey={process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY!}
      theme={
        localStorage.getItem("goldrush_theme")
          ? JSON.parse(localStorage.getItem("goldrush_theme")!)
          : kit.theme
      }
    >
      <WalletContext.Provider value={contextValue}>
        {children}
      </WalletContext.Provider>
    </GoldRushProvider>
  );
};
