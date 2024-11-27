export const config = {
  app: {
    brokerId: "Demo",
    brokerName: "Demo",
    configStore: "custom",
  },
  mainNavMenus: {
    logo: {
      src: "",
      alt: "",
    },
    mainMenus: [
      {
        id: "",
        name: "",
        href: "",
      },
    ],
  },
  walletConnector: {
    onboard: {
      evmInitial: {
        apiKey: "",
        skipInit: false,
      },
    },
  },
  projectConfig: {
    paths: {
      themeCSS: "src/globals.css",
      src: "src",
      public: "public",
      components: "src/components",
    },
  },
  // pages: {
  //   trading: {
  //     symbol: "ETH-USDC-PREP",
  //     tradingViewConfig: {
  //       scriptPath: "",
  //     },
  //     referral: {
  //       saveRefCode: false,
  //     },
  //   },
  //   market: {},
  //   portfolio: {},
  // },
};
