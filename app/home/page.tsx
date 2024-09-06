"use client";
import Layout from "@/app/ui/layout";
import useHome from "@/hooks/useHome";
import Header from "../ui/header";
import LabelStatistics from "../ui/charts/barchart";

export default function Home() {
  const { labels, exportReport } = useHome();

  const branches = labels.reduce<{ id: number; address: string }[]>((acc, label) => {
    if (!acc.some((branch) => branch.id === label.branch_id)) {
      acc.push({ id: label.branch_id, address: label.branch_address });
    }
    return acc;
  }, []);

  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={""} searchText={() => {}} download={exportReport} />
      </div>
      <div className="w-[90%] h-[80%] mt-4 overflow-y-scroll mx-auto no-scrollbar">
        <div className="w-full h-[30%]">
          <h4 className="text-2xl mb-2">Resumen</h4>
          <div className="mb-4">
            <p className="mb-2">Sucursales:</p>
            <div className="w-full flex gap-8 overflow-x-scroll no-scrollbar">
              {branches.map((branch) => (
                <div key={branch.id}>
                  <p className="text-[12px]">ID: {branch.id}</p>
                  <p className="text-[12px]">Dirección: {branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <LabelStatistics labels={labels} />
      </div>
    </Layout>
  );
}
