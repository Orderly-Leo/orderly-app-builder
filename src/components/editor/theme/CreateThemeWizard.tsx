import { editorServiceAtom } from "@/components/config/configs.atom";
import { Separator } from "@/components/ui/separator";
import { useAtom, useAtomValue } from "jotai";
import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Theme, themesAtom } from "./theme.atom";
import { ThemeItems } from "./type";

export function CreateThemeWizard() {
  const navigate = useNavigate();
  const editorService = useAtomValue(editorServiceAtom);
  const [themes, setThemes] = useAtom(themesAtom);
  const onCreate = (data: {
    name: string;
    description: string;
    isDefault: boolean;
    // theme: Record<string, any>;
  }) => {
    const { isDefault, ...rest } = data;
    const newTheme = {
      ...rest,
      theme: {} as ThemeItems, // copy from template
    };
    setThemes([...themes, newTheme as Theme]);
    editorService?.appendTheme(newTheme as any);

    // write css file if it is the default theme
    if (isDefault) {
      //   editorService?.setDefaultTheme(data.name);
    }

    navigate(`/editor/themes/${data.name}`, { replace: true });
  };
  return (
    <div className="h-screen">
      <div className="shrink-0 ">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <ArrowLeft
              size={18}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <div className="text-xl font-medium">Create New Theme</div>
          </div>
        </div>
        <Separator />
      </div>
      <div className="flex-1">
        <Outlet context={{ onCreate: onCreate }} />
      </div>
    </div>
  );
}
