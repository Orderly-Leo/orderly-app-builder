import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ColorScheme {
  name: string;
  colors: string[];
}

const themes: ColorScheme[] = [
  {
    name: "Traditional Diwali",
    colors: ["#4B0082", "#800080", "#C71585", "#FFD700", "#FF8C00", "#228B22"],
  },
  {
    name: "Pastel Color Tones",
    colors: ["#E6D7E8", "#9B8BA5", "#C8A2C8", "#FFE4E1", "#FFE4E1"],
  },
  {
    name: "Darkest-Lightest Greys",
    colors: ["#1C1C1C", "#2B2B2B", "#3F3F3F", "#4F4F4F", "#5E5E5E"],
  },
];

export const ThemesPanel: FC = () => {
  return (
    <div className="p-6 space-y-8">
      {themes.map((theme) => (
        <div key={theme.name} className="space-y-2 group">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium flex-1">{theme.name}</h3>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 text-gray-300 group-hover:text-gray-900 transition-colors"
                asChild
              >
                <Link to={`${theme.name}`}>
                  <Pencil className="w-4 h-4 text-inherit" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="p-0 text-gray-300 group-hover:text-gray-900 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-inherit" />
              </Button>
            </div>
          </div>
          <div className="flex rounded-lg overflow-hidden h-24">
            {theme.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
