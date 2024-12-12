export interface PageType {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  dependencies: string[];
  identifier: string;
  props?: any;
  propTypes?: any;
  //   codeGenerator: (args: any) => string;
  // template: string;
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
    id: "tradingPage",
    name: "Trading",
    identifier: "<TradingPage",
    description: "Full-featured trading interface with orderbook and charts",
    thumbnail: "/pages/trading-page@2x.png",
    defaultConfig: {
      pageName: "Trading",
      route: "/perp",
    },
    props: {
      tradingViewConfig: {
        scriptSRC: "",
        library_path: "",
        customCssUrl: "",
      },
      sharePnLConfig: {
        backgroundImages: [],

        color: "rgba(255, 255, 255, 0.98)",
        profitColor: "rgba(41, 223, 169, 1)",
        lossColor: "rgba(245, 97, 139, 1)",
        brandColor: "rgba(255, 255, 255, 0.98)",

        // ref
        refLink: "https://orderly.network",
        refSlogan: "Orderly referral",
      },
    },

    propTypes: {
      tradingViewConfig: {
        scriptSRC: {
          _control: {
            type: "file",
          },
        },
      },
      sharePnLConfig: {
        color: {
          _control: {
            type: "color",
          },
        },
      },
    },

    dependencies: ["@orderly.network/trading"],
  },
  {
    id: "market",
    name: "Market Overview",
    identifier: "<MarketsHomePage",
    description: "Display market data and statistics",
    thumbnail: "/pages/market-page@2x.png",
    dependencies: ["@orderly.network/markets"],
    defaultConfig: {
      pageName: "Markets",
      route: "/markets",
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    identifier: "<OverviewModule.OverviewPage",
    description: "User portfolio and asset management",
    thumbnail: "/pages/portfolio-page@2x.png",
    dependencies: ["@orderly.network/portfolio"],
    defaultConfig: {
      pageName: "Portfolio",
      route: "/portfolio",
    },
  },
  {
    id: "settings",
    name: "Settings",
    identifier: "<SettingModule.SettingPage",
    description: "User preferences and account settings",
    thumbnail: "/pages/settings.png",
    dependencies: ["@orderly.network/trading"],
    defaultConfig: {
      pageName: "Settings",
      route: "/settings",
    },
  },
  {
    id: "settings-api-key",
    name: "API Key",
    identifier: "<APIManagerModule.APIManagerPage",
    description: "API Key management",
    dependencies: ["@orderly.network/trading"],
    defaultConfig: {
      pageName: "API Key",
      route: "/portfolio/api-key",
    },
  },
];

export const availableComponents: string[] = availablePages.map(
  (page) => page.identifier
);
