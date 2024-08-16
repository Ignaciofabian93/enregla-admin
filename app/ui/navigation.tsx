"use client";
import { usePathname } from "next/navigation";
import { BuildingIcon } from "../assets/icons/building";
import { HomeIcon } from "../assets/icons/home";
import { LabelIcon } from "../assets/icons/label";
import { UsersIcon } from "../assets/icons/users";
import { WheelIcon } from "../assets/icons/wheel";
import { Tooltip } from "@nextui-org/tooltip";
import { LogoutIcon } from "../assets/icons/logout";
import Link from "next/link";
import useSession from "../hooks/useSession";

const navigationMenu = [
  { name: "Inicio", path: "/home", icon: <HomeIcon color="#fff" /> },
  { name: "Operadores", path: "/users", icon: <UsersIcon color="#fff" /> },
  { name: "Insumos", path: "/supplies", icon: <LabelIcon color="#fff" /> },
  { name: "Sucursales", path: "/branches", icon: <BuildingIcon color="#fff" /> },
  { name: "Vehículos", path: "/vehicles", icon: <WheelIcon color="#fff" /> },
];

export default function Navigation() {
  const path = usePathname();
  const { logout } = useSession();

  return (
    <section className="w-full h-[50px] flex items-center justify-center">
      <nav className="w-[40%] h-[50px] flex items-center justify-evenly bg-gradient-to-br from-slate-700/40 to-zinc-700/40 backdrop-blur-lg rounded-lg absolute bottom-[0.5rem]">
        <ul className="w-full h-[45px] flex items-center justify-center cursor-pointer">
          {navigationMenu.map((item) => (
            <Tooltip
              key={item.path}
              content={item.name}
              placement="top"
              className="bg-zinc-600/30 backdrop-blur-lg px-[1rem] rounded-md text-[12px] text-white mb-[1rem]"
            >
              <Link
                href={item.path}
                className={`
              w-[36px] h-[72%] flex items-center justify-center mx-[1rem]
              rounded-lg ${path === item.path ? "bg-slate-500" : "bg-slate-700"}
              hover:scale-110 hover:bg-slate-500/50 transition-transform-colors duration-300 ease-in-out
              `}
              >
                {item.icon}
              </Link>
            </Tooltip>
          ))}
          <Tooltip
            content="Salir"
            placement="top"
            className="bg-rose-600/50 backdrop-blur-lg px-[1rem] rounded-md text-[12px] text-white mb-[1rem]"
          >
            <div
              className={`
            w-[36px] h-[72%] flex items-center justify-center mx-[1rem]
            rounded-lg bg-slate-700
            hover:scale-110 hover:bg-rose-600/50 transition-transform-colors duration-300 ease-in-out
            `}
              onClick={logout}
            >
              <LogoutIcon />
            </div>
          </Tooltip>
        </ul>
      </nav>
    </section>
  );
}
