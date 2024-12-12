import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface PreviewToolbarProps {
  currentUrl: string;
  urls: string[];
  onUrlChange: (url: string) => void;
  onRefresh: () => void;
}

export const PreviewToolbar = ({
  // currentUrl,
  // urls,
  // onUrlChange,
  onRefresh,
}: PreviewToolbarProps) => {
  return (
    <div className="flex gap-2 p-2 border-b border-gray-200">
      {/* <Select.Root value={currentUrl} onValueChange={onUrlChange}>
        <Select.Trigger className="flex-1" />
        <Select.Content>
          {urls.map((url) => (
            <Select.Item key={url} value={url}>
              {url}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root> */}

      <Button variant="ghost" onClick={onRefresh} title="Refresh preview">
        <ReloadIcon />
      </Button>
    </div>
  );
};
