export const PageTemplateList = () => {
  return (
    <div className="flex flex-col gap-3">
      <PageTemplateItem />
      <PageTemplateItem />
    </div>
  );
};

const PageTemplateItem = () => {
  return (
    <div className="h-28 bg-white border border-gray-300 rounded aspect-square"></div>
  );
};
