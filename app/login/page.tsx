"use client";
import Image from "next/image";
import CustomInput from "../ui/input";
import CustomButton from "../ui/button";
import useSession from "../../hooks/useSession";
import { validate_email, validate_password } from "@/utils/regexValidations";

const brand = require("@/assets/images/brand.png");

export default function Login() {
  const { form, handleForm, isLoading, login } = useSession();
  return (
    <>
      <main className="w-screen h-screen flex bg-gradient-to-br from-slate-900 to-zinc-900 text-white">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="h-[20%] flex flex-col items-center mb-[2rem]">
            <Image src={brand} alt="Enregla" className="mb-[12px] w-1/3 h-auto" priority />
            <h2 className="text-2xl">Administración</h2>
          </div>
          <div className="w-[40%] h-[40%] flex flex-col items-center">
            <CustomInput
              value={form.email}
              onChange={(e) => handleForm("email", e.target.value)}
              placeholder="Email"
              isInvalid={validate_email(form.email)}
              errorMessage={"Porfavor ingrese un RUT válido"}
            />
            <CustomInput
              value={form.password}
              type="password"
              onChange={(e) => handleForm("password", e.target.value)}
              placeholder="Contraseña"
              isInvalid={validate_password(form.password)}
              errorMessage={"Porfavor ingrese una contraseña válida"}
            />
            <CustomButton
              text="Iniciar sesión"
              style={{ marginTop: "16px" }}
              onClick={login}
              isLoading={isLoading}
              buttonType="primary"
            />
          </div>
        </div>
      </main>
    </>
  );
}
