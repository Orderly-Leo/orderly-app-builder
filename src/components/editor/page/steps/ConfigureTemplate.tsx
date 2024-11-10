import { FormGroup, InputGroup } from "@blueprintjs/core";
import { PageTemplate, PageConfig } from "../../../../types/page";
import { ChangeEvent } from "react";

interface ConfigureTemplateProps {
  template: PageTemplate;
  config: Partial<PageConfig>;
  onChange: (config: Partial<PageConfig>) => void;
}

export const ConfigureTemplate = ({
  template,
  config,
  onChange,
}: ConfigureTemplateProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handlePropChange = (prop: string, value: any) => {
    onChange({
      ...config,
      props: {
        ...config.props,
        [prop]: value,
      },
    });
  };

  return (
    <div className="flex gap-6">
      {/* 左侧预览区域 */}
      <div className="w-1/3">
        <h4 className="mb-3 font-medium">Template Preview</h4>
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {template.thumbnail ? (
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No preview available
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">{template.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {template.description}
          </p>
        </div>
      </div>

      {/* 右侧配置表单 */}
      <div className="flex-1 space-y-6">
        <FormGroup label="Page Name" labelFor="page-name">
          <InputGroup
            id="page-name"
            value={config.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
            placeholder="Enter page name"
          />
        </FormGroup>

        <FormGroup label="Route" labelFor="page-route">
          <InputGroup
            id="page-route"
            value={config.route || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("route", e.target.value)
            }
            placeholder="/path/to/page"
          />
        </FormGroup>

        {Object.entries(template.props || {}).length > 0 && (
          <div>
            <h4 className="mb-3 font-medium">Page Properties</h4>
            <div className="space-y-4">
              {Object.entries(template.props || {}).map(([prop, schema]) => (
                <FormGroup
                  key={prop}
                  label={
                    <>
                      {prop}
                      {schema.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </>
                  }
                  helperText={schema.description}
                >
                  <InputGroup
                    value={config.props?.[prop] || schema.default || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handlePropChange(prop, e.target.value)
                    }
                    placeholder={schema.description}
                  />
                </FormGroup>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
