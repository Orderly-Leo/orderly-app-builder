export interface PageType {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  dependencies: string[];
  //   codeGenerator: (args: any) => string;
  template: string;
  defaultConfig: {
    pageName: string;
    route: string;
  };
}

export interface SelectedPage extends PageType {
  isSelected: boolean;
  customName: string;
  customRoute: string;
}

export const availablePages: PageType[] = [
  {
    id: "trading",
    name: "Trading",
    description: "Full-featured trading interface with orderbook and charts",
    thumbnail: "/pages/trading-page@2x.png",
    defaultConfig: {
      pageName: "Trading",
      route: "/perp",
    },

    dependencies: ["@orderly.network/trading"],
    template: `
    import { TradingPage } from "@orderly.network/trading";

    <TradingPage
    tradingViewConfig={config.tradingPage.tradingViewConfig}
    sharePnLConfig={config.tradingPage.sharePnLConfig}
    symbol={symbol}
    onSymbolChange={(symbol) => {
      setSymbol(symbol.symbol);
    }}
  />`,
    // codeGenerator: (args: any) => {
    //   return ejs.render(
    //     `
    //     import { TradingPage } from "@orderly.network/trading";

    //     <TradingPage
    //     tradingViewConfig={config.tradingPage.tradingViewConfig}
    //     sharePnLConfig={config.tradingPage.sharePnLConfig}
    //     symbol={symbol}
    //     onSymbolChange={(symbol) => {
    //       setSymbol(symbol.symbol);
    //     }}
    //   />`,
    //     args
    //   );
    // },
  },
  {
    id: "market",
    name: "Market Overview",
    description: "Display market data and statistics",
    thumbnail: "/pages/market-page@2x.png",
    dependencies: ["@orderly.network/markets"],
    defaultConfig: {
      pageName: "Markets",
      route: "/markets",
    },
    template: ``,
    // codeGenerator: (args: any) => {
    //   return "";
    // },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "User portfolio and asset management",
    thumbnail: "/pages/portfolio-page@2x.png",
    dependencies: ["@orderly.network/portfolio"],
    defaultConfig: {
      pageName: "Portfolio",
      route: "/portfolio",
    },
    template: ``,
    // codeGenerator: (args: any) => {
    //   return "";
    // },
  },
  // {
  //   id: "settings",
  //   name: "Settings",
  //   description: "User preferences and account settings",
  //   thumbnail: "/pages/settings.png",
  //   dependencies: ["@orderly.network/trading"],
  //   defaultConfig: {
  //     pageName: "Settings",
  //     route: "/settings",
  //   },
  //   template: ``,
  //   // codeGenerator: (args: any) => {
  //   //   return "";
  //   // },
  // },
];
