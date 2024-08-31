import { Branch } from "../../types/branch";
import { User } from "../../types/user";
import CustomInput from "../ui/input";
import CustomSelect from "../ui/select";

type FormProps = {
  user: User;
  branches: Branch[];
  roles: { id: number; value: string }[];
  handleUser: (field: string, value: string) => void;
};

export default function UserForm({ user, branches, handleUser, roles }: FormProps) {
  return (
    <>
      <div className="w-[90%] h-full flex mx-auto justify-between">
        <div className="w-[50%] h-full flex flex-col items-center justify-between">
          <CustomInput
            value={user.name}
            onChange={(e) => handleUser("name", e.target.value)}
            placeholder="Nombre"
            size="md"
          />
          <CustomInput
            value={user.email}
            onChange={(e) => handleUser("email", e.target.value)}
            placeholder="Email"
            size="md"
          />
          <CustomInput
            value={user.password}
            onChange={(e) => handleUser("password", e.target.value)}
            placeholder="Contraseña"
            size="md"
          />
        </div>
        <div className="w-[50%] h-full flex flex-col items-center justify-start">
          <div className="w-full h-fit flex items-center justify-center">
            <CustomSelect
              options={branches.map((el) => ({ key: el.address, label: el.address }))}
              value={[user.branch]}
              onChange={(e) => handleUser("branch", e.target.value)}
              placeholder="Sucursal"
              size="md"
            />
          </div>
          <div className="w-full h-fit flex items-center justify-center">
            <CustomSelect
              options={roles.map((el) => ({ key: el.value, label: el.value }))}
              value={[user.role]}
              onChange={(e) => handleUser("role", e.target.value)}
              placeholder="Rol"
              size="md"
            />
          </div>
          <div className="w-full h-fit flex items-center justify-center">
            <CustomInput
              value={user.password2 as string}
              onChange={(e) => handleUser("password2", e.target.value)}
              placeholder="Confirmar contraseña"
              size="md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
