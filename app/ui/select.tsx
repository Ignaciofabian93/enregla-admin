import { Select, SelectItem } from "@nextui-org/select";

type Props = {
  options: { key: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | string[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
};

export default function CustomSelect({
  onChange,
  options,
  value,
  placeholder,
  disabled = false,
  multiple = false,
  size = "md",
}: Props) {
  const sizeStyles = {
    xs: "w-[40%]",
    sm: "w-[60%]",
    md: "w-[80%]",
    lg: "w-[100%]",
  };
  return (
    <Select
      aria-label="select"
      variant="bordered"
      onChange={onChange}
      multiple={multiple}
      selectedKeys={value}
      label={placeholder}
      color="default"
      className={`${sizeStyles[size]} h-[56px] mx-[8px] my-[7px]`}
      isDisabled={disabled}
      radius="sm"
      classNames={{
        listboxWrapper: "bg-transparent hover:bg-transparent",
        listbox: "bg-transparent hover:bg-transparent",
        popoverContent: "text-[#222] bg-gradient-to-br from-slate-200 to-slate-400 rounded-[8px]", //options modal bg color and options text color
        // innerWrapper: "text-rose-800 hover:bg-rose-800", // select container for value
        mainWrapper: "text-white", // select -> border and label
        selectorIcon: "text-white", // caret icon
        value: "text-white", //number
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.key} textValue={option.label}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
