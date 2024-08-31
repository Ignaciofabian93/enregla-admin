import { Brand, Model, Vehicle } from "../../types/vehicle";
import Image from "next/image";
import CustomInput from "../ui/input";
import CustomSelect from "../ui/select";

type FormProps = {
  brands: Brand[];
  models: Model[];
  vehicle: Vehicle;
  handleVehicle: (field: string, value: string) => void;
};

export default function VehicleForm({ vehicle, handleVehicle, brands, models }: FormProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleVehicle("logo", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-[90%] h-full flex mx-auto justify-between">
        <div className="w-full h-full flex">
          <div className="w-[45%] h-full flex flex-col items-center justify-between">
            <CustomSelect
              options={brands.map((brand) => ({ key: brand.brand, label: brand.brand }))}
              onChange={(e) => handleVehicle("brand_selected", e.target.value)}
              value={[vehicle.brand]}
              placeholder="Marcas"
            />
            <CustomSelect
              options={models
                .filter((el) => el.brand_id === vehicle.brand_id)
                .map((model) => ({ key: model.model, label: model.model }))}
              onChange={() => {}}
              value={[vehicle.model]}
              placeholder="Modelos"
            />
          </div>
          <div className="w-[45%] h-full flex flex-col items-center justify-between">
            <CustomInput
              value={vehicle.brand}
              onChange={(e) => handleVehicle("brand", e.target.value)}
              placeholder="Marca"
              size="lg"
            />
            <CustomInput
              value={vehicle.model}
              onChange={(e) => handleVehicle("model", e.target.value)}
              placeholder="Modelo"
              size="lg"
            />
          </div>
        </div>
        <div className="w-[45%] h-full flex flex-col items-center justify-between py-[0.5rem]">
          <div className="w-[200px] h-[140px] flex items-center justify-center rounded-lg">
            {vehicle.logo ? (
              <Image src={vehicle.logo} alt="logo" width={120} height={120} />
            ) : (
              <div className="w-full h-full bg-slate-600/30 rounded-lg backdrop-blur-lg"></div>
            )}
          </div>
          <div className="w-full h-[20%] flex items-center justify-center">
            <label
              htmlFor="logo"
              className={`
              bg-slate-700 text-white px-[1.5rem] py-[0.8rem] rounded-[8px] my-[1rem]
              text-sm font-medium cursor-pointer hover:bg-slate-600 transition-colors duration-300 ease-in-out
              `}
            >
              Cargar logo
            </label>
            <input
              id="logo"
              type="file"
              className="hidden w-0 h-0"
              accept="image/png, image/jpeg"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
    </>
  );
}
