import { Button, HTMLSelect } from "@blueprintjs/core";

interface PreviewToolbarProps {
  currentUrl: string;
  urls: string[];
  onUrlChange: (url: string) => void;
  onRefresh: () => void;
}

export const PreviewToolbar = ({
  currentUrl,
  urls,
  onUrlChange,
  onRefresh,
}: PreviewToolbarProps) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200">
      <HTMLSelect
        value={currentUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        className="flex-1"
      >
        {urls.map((url) => (
          <option key={url} value={url}>
            {url}
          </option>
        ))}
      </HTMLSelect>

      <Button
        icon="refresh"
        minimal={true}
        onClick={onRefresh}
        title="Refresh preview"
      />
    </div>
  );
};
