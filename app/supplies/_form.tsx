// import { Branch } from "../types/branch";
// import { Supply } from "../types/supply";
// import CustomInput from "../ui/input";
// import CustomSelect from "../ui/select";
// import CustomAutoComplete from "../ui/autocomplete";

// type FormProps = {
//   supply: Supply;
//   branches: Branch[];
//   handleSupply: (field: string, value: string) => void;
// };

// export default function UserForm({ supply, branches, handleSupply, roles }: FormProps) {
//   return (
//     <>
//       <div className="w-[90%] h-full flex mx-auto justify-between">
//         <div className="w-[45%] h-full flex flex-col items-center justify-between">
//           <CustomInput
//             value={supply.rut}
//             onChange={(e) => handleSupply("rut", e.target.value)}
//             placeholder="RUT"
//             size="lg"
//           />
//           <CustomInput
//             value={supply.email}
//             onChange={(e) => handleSupply("email", e.target.value)}
//             placeholder="Email"
//             size="lg"
//           />
//         </div>
//         <div className="w-[45%] h-full flex flex-col items-center justify-start">
//           <div className="w-full h-fit flex items-center justify-center my-[1px]">
//             <CustomSelect
//               options={branches.map((el) => ({ key: el.address, label: el.address }))}
//               value={[supply.branch]}
//               onChange={(e) => handleSupply("branch", e.target.value)}
//               placeholder="Sucursal"
//               size="lg"
//             />
//           </div>
//           <div className="w-full h-fit flex items-center justify-center my-[1px]">
//             <CustomSelect
//               options={roles.map((el) => ({ key: el.value, label: el.value }))}
//               value={[supply.role]}
//               onChange={(e) => handleSupply("role", e.target.value)}
//               placeholder="Rol"
//               size="lg"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
