// import { Autocomplete, AutocompleteItem, type AutocompleteProps } from "@nextui-org/autocomplete";

// type CustomAutoComplete = AutocompleteProps & {};

// export default function CustomAutoComplete({
//   selectedKey,
//   defaultItems,
//   label,
//   placeholder,
//   onSelectionChange,
//   value,
// }: CustomAutoComplete) {
//   return (
//     <div className="flex w-full max-w-xs flex-col gap-2">
//       <Autocomplete
//         label={label}
//         variant="bordered"
//         defaultItems={defaultItems}
//         placeholder={placeholder}
//         className="max-w-xs"
//         selectedKey={selectedKey}
//         onSelectionChange={onSelectionChange}
//       >
//         {defaultItems.map((item) => (
//           <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
//         ))}
//       </Autocomplete>
//       <p className="text-default-500 text-small">Selected: {value}</p>
//     </div>
//   );
// }
