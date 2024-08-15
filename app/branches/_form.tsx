import { Agency } from "../types/agency";
import { Branch } from "../types/branch";
import CustomInput from "../ui/input";
import CustomSelect from "../ui/select";

type FormProps = {
  agencies: Agency[];
  branch: Branch;
  handleBranch: (field: string, value: string) => void;
};

export default function BranchForm({ branch, handleBranch, agencies }: FormProps) {
  return (
    <>
      <div className="w-[90%] h-full flex mx-auto justify-between">
        <div className="w-[45%] h-full flex flex-col items-center justify-between">
          <CustomSelect
            options={agencies.map((el) => ({ key: el.name, label: el.name }))}
            value={[branch.agency]}
            onChange={(e) => handleBranch("agency", e.target.value)}
            placeholder="Automotora"
            size="lg"
          />
          <CustomInput
            value={branch.location}
            onChange={(e) => handleBranch("location", e.target.value)}
            placeholder="Coordenadas"
            size="lg"
          />
        </div>
        <div className="w-[45%] h-full flex flex-col items-center justify-between">
          <CustomInput
            value={branch.address}
            onChange={(e) => handleBranch("address", e.target.value)}
            placeholder="Dirección"
            size="lg"
          />
          <CustomInput
            value={branch.telephone}
            onChange={(e) => handleBranch("telephone", e.target.value)}
            placeholder="Teléfono"
            size="lg"
          />
        </div>
      </div>
    </>
  );
}
