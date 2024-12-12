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
}: // type,
// value,
// options,
// onChange,
SettingItemProps) => {
  const renderControl = () => {
    return <div>Select error</div>;
    // switch (type) {

    //   case "boolean":
    //     return <Switch checked={value} onCheckedChange={onChange} />;
    //   case "select":
    //     return (
    //       <Select.Root value={value} onValueChange={onChange}>
    //         <Select.Trigger />
    //         <Select.Content>
    //           {options?.map((option) => (
    //             <Select.Item key={option.value} value={option.value}>
    //               {option.label}
    //             </Select.Item>
    //           ))}
    //         </Select.Content>
    //       </Select.Root>
    //     );
    //   case "number":
    //     return (
    //       <TextField.Root
    //         type="number"
    //         value={value}
    //         onChange={(e) => onChange(Number(e.target.value))}
    //       />
    //     );
    //   default:
    //     return null;
    // }
  };

  return (
    <div>
      <div className="text-lg font-bold">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
      <div className="mt-2">{renderControl()}</div>
    </div>
  );
};
