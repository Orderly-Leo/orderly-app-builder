import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { CreatePageWizard } from "./createPageWizard";
import { PageConfig } from "../../../types/page";

export const PageToolbar = () => {
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  const handleCreatePage = (pageConfig: PageConfig) => {
    console.log("Created page:", pageConfig);
    // 处理创建页面的逻辑
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <Button onClick={() => setShowCreateWizard(true)}>Create Page</Button>

      <CreatePageWizard
        open={showCreateWizard}
        onOpenChange={setShowCreateWizard}
        onComplete={handleCreatePage}
      />
    </div>
  );
};
