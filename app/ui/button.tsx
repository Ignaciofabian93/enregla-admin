import { Button, type ButtonProps } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

type Button = ButtonProps & {
  text: string;
  buttonType?: "primary" | "secondary";
};

export default function CustomButton({
  text,
  onClick,
  isDisabled = false,
  isLoading = false,
  size = "md",
  buttonType = "primary",
  ...rest
}: Button) {
  const type = {
    primary: "bg-green-800 text-white",
    secondary: "bg-slate-600 text-white",
  };
  return (
    <>
      <Button
        onClick={onClick}
        isDisabled={isDisabled}
        className={`${type[buttonType]} shadow-md min-w-[130px]`}
        size={size}
        radius="sm"
        {...rest}
      >
        {isLoading ? <Spinner size="sm" color="default" /> : text}
      </Button>
    </>
  );
}
