import { PageList } from "../page/pageList";
import { PageToolbar } from "../page/PageToolbar";

export const PagesPanel = () => {
  return (
    <div>
      <PageToolbar />
      <div>
        <PageList />
      </div>
      {/* Pages content */}
    </div>
  );
};
