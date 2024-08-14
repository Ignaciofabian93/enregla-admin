import { Input, type InputProps } from "@nextui-org/input";

type Props = InputProps & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  errorMessage?: string;
  isInvalid?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function CustomInput({
  type,
  value,
  onChange,
  placeholder,
  readonly,
  errorMessage,
  isInvalid,
  size = "md",
  ...rest
}: Props) {
  const sizeStyles = {
    sm: "w-[60%]",
    md: "w-[80%]",
    lg: "w-[100%]",
  };
  return (
    <div className={`${sizeStyles[size]} mx-[8px] my-[8px] relative`}>
      <Input
        aria-label="input"
        variant="bordered"
        type={type}
        value={value}
        onChange={onChange}
        label={placeholder}
        color="primary"
        autoComplete="off"
        className="h-[56px]"
        classNames={{
          input: "bg-transparent text-white",
          inputWrapper: "bg-transparent",
          label: "text-white",
        }}
        radius="sm"
        required={true}
        readOnly={readonly}
        isInvalid={isInvalid}
        {...rest}
      />
      {isInvalid && errorMessage && (
        <small className="text-[10px] text-rose-500 absolute -bottom-[15px] left-2">{errorMessage}</small>
      )}
    </div>
  );
}
