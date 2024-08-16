"use client";
import Layout from "@/app/ui/layout";
import Header from "../ui/header";

export default function Home() {
  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={""} searchText={() => {}} />
      </div>
    </Layout>
  );
}
