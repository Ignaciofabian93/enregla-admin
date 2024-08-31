import { UserIcon } from "../../assets/icons/user";
import Image from "next/image";
import CustomInput from "./input";
import useSessionStore from "@/store/session";

type Header = {
  searchedText: string;
  searchText: (text: string) => void;
};

const logo = require("@/assets/images/brand.png");

export default function Header({ searchedText, searchText }: Header) {
  const { session } = useSessionStore();
  return (
    <>
      <section className="w-full h-[10%] flex items-center justify-between mb-[1%]">
        <div className="text-2xl w-[14%]">
          <Image src={logo} alt="logo" className="w-full h-full" />
        </div>
        <div className="w-[70%] h-full flex items-center justify-end gap-[2rem]">
          <div className="w-[40%] h-full flex items-center justify-evenly">
            <CustomInput
              value={searchedText}
              type="text"
              onChange={(e) => searchText(e.target.value)}
              placeholder="Buscar..."
              size="lg"
            />
          </div>
          <div className="min-w-[24%] max-w-[40%] h-full px-[8px] rounded-[8px] flex items-center justify-between">
            <div>
              <h3 className="text-[18px]">{session.name}</h3>
              <p className="text-[12px]">{session.email}</p>
            </div>
            <div>
              <UserIcon color="#fff" w="32" h="32" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
