import { Card, Icon, Text } from "@blueprintjs/core";
import { PageConfig } from "../../../types/page";

interface PageListProps {
  pages?: PageConfig[];
}

export const PageList = ({ pages = [] }: PageListProps) => {
  if (pages.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Icon icon="document" size={20} className="mb-2" />
        <Text>No pages created yet</Text>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4">
      {pages.map((page) => (
        <Card
          key={page.id}
          interactive
          className="flex items-center justify-between"
        >
          <div>
            <Text className="font-medium">{page.name}</Text>
            <Text className="text-gray-500 text-sm">{page.route}</Text>
          </div>
          <div className="flex gap-2">
            <Icon
              icon="edit"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
            <Icon
              icon="trash"
              className="cursor-pointer text-gray-500 hover:text-red-500"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
