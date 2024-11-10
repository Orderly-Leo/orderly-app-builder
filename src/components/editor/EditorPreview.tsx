export const EditorPreview = () => {
  return (
    <div className="h-full w-full">
      <iframe
        src="/preview"
        className="w-full h-full border-none bg-white"
        title="Preview"
      />
    </div>
  );
};
