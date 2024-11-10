import { Switch, HTMLSelect, NumericInput, FormGroup } from "@blueprintjs/core";

interface SettingItemProps {
  id: string;
  label: string;
  description: string;
  type: string;
  value: any;
  options?: { label: string; value: any }[];
  onChange: (value: any) => void;
}

export const SettingItem = ({
  label,
  description,
  type,
  value,
  options,
  onChange,
}: SettingItemProps) => {
  const renderControl = () => {
    switch (type) {
      case "boolean":
        return (
          <Switch
            checked={value}
            onChange={(e) => onChange(e.currentTarget.checked)}
          />
        );
      case "select":
        return (
          <HTMLSelect
            value={value}
            options={options || []}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        );
      case "number":
        return (
          <NumericInput
            value={value}
            onValueChange={onChange}
            min={0}
            stepSize={1}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormGroup label={label} helperText={description} className="mb-0">
      {renderControl()}
    </FormGroup>
  );
};
