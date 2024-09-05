"use client";
import Layout from "@/app/ui/layout";
import Header from "../ui/header";
import useHome from "../../hooks/useHome";
import Charts from "../ui/charts/barchart";

export default function Home() {
  const { labels } = useHome();

  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={""} searchText={() => {}} />
      </div>
      <div className="w-[90%] h-[80%] overflow-y-scroll mx-auto no-scrollbar">
        <Charts labels={labels} />
      </div>
    </Layout>
  );
}
