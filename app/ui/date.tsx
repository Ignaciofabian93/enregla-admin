import { DatePicker } from "@nextui-org/date-picker";
import { DateValue } from "@react-types/datepicker";

type DateRangeProps = {
  label: string;
  date: DateValue;
  onChange: (date: DateValue) => void;
};

export default function CustomDatePicker({ label, date, onChange }: DateRangeProps) {
  return (
    <DatePicker
      aria-label="date"
      label={label}
      className="my-[4px] mx-[8px] text-white"
      value={date}
      size="md"
      onChange={onChange}
      variant="bordered"
      visibleMonths={1}
      pageBehavior="single"
      radius="sm"
      classNames={{
        selectorButton: "text-white",
        calendar: "text-[#222]",
        input: "text-white",
        label: "text-white",
      }}
    />
  );
}
