import { Branch } from "../types/branch";
import { Supply } from "../types/supply";
import CustomInput from "../ui/input";
import CustomSelect from "../ui/select";

type FormProps = {
  supply: Supply;
  branches: Branch[];
  handleSupply: (field: string, value: string) => void;
};

export default function SupplyForm({ supply, branches, handleSupply }: FormProps) {
  return (
    <>
      <div className="w-[90%] h-full flex mx-auto justify-between">
        <div className="w-[45%] h-full flex flex-col items-center justify-between">
          <CustomInput
            value={supply.category}
            onChange={(e) => handleSupply("category", e.target.value)}
            placeholder="Categoría"
            size="lg"
          />
          <CustomInput
            value={supply.name}
            onChange={(e) => handleSupply("name", e.target.value)}
            placeholder="Nombre/Código"
            size="lg"
          />
          <CustomInput
            value={supply.quantity.toString()}
            type="number"
            onChange={(e) => handleSupply("quantity", e.target.value)}
            placeholder="Cantidad"
            size="lg"
          />
        </div>
        <div className="w-[45%] h-full flex flex-col items-center justify-start">
          <div className="w-[96%] h-full flex flex-col items-center justify-between">
            <CustomInput
              value={supply.price.toString()}
              type="number"
              onChange={(e) => handleSupply("price", e.target.value)}
              placeholder="Precio"
              size="lg"
            />
          </div>
          <div className="w-full h-fit flex items-center justify-center my-[1px]">
            <CustomSelect
              options={branches.map((el) => ({ key: el.address, label: el.address }))}
              value={[supply.branch]}
              onChange={(e) => handleSupply("branch", e.target.value)}
              placeholder="Sucursal"
              size="lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
