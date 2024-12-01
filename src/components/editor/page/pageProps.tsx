import { LayoutProps } from "./props/layout";

import { useAtom } from "jotai";
import { pathsAtom } from "../page/pages.atom";
import { ObjectFields } from "@/objectEditor/fields";
import { ObjectEditor } from "@/objectEditor";

export const PageProps = () => {
  const [paths] = useAtom(pathsAtom);
  console.log(paths);
  return (
    <div>
      <LayoutProps />
      {/* <PageProps /> */}
      <ObjectEditor
        showCategory={false}
        object={{
          tradingViewConfig: {
            scriptSRC: "/tradingview/charting_library/charting_library.js",
            library_path: "/tradingview/charting_library/",
            customCssUrl: "/tradingview/chart.css",
          },
          sharePnLConfig: {
            backgroundImages: [
              "/pnl/poster_bg_1.png",
              "/pnl/poster_bg_2.png",
              "/pnl/poster_bg_3.png",
              "/pnl/poster_bg_4.png",
            ],

            color: "rgba(255, 255, 255, 0.98)",
            profitColor: "rgba(41, 223, 169, 1)",
            lossColor: "rgba(245, 97, 139, 1)",
            brandColor: "rgba(255, 255, 255, 0.98)",

            // ref
            refLink: "https://orderly.network",
            refSlogan: "Orderly referral",
          },
        }}
      />
    </div>
  );
};
