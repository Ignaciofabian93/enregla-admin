"use client";
import { Spinner } from "@nextui-org/spinner";
import dynamic from "next/dynamic";
import Layout from "@/app/ui/layout";
import Header from "../ui/header";
import CustomButton from "../ui/button";
import CustomTable from "../ui/table";
import CustomPagination from "../ui/pagination";
import useSupplies from "../../hooks/useSupplies";
import SupplyForm from "./_form";

const CustomModal = dynamic(() => import("../ui/modal"), { ssr: false });

export default function Supplies() {
  const {
    supplies,
    filteredSupplies,
    columns,
    handlePage,
    handleRows,
    totalPages,
    total,
    page,
    rows,
    loading,
    handleSearch,
    searched,
    showModal,
    openModal,
    closeModal,
    branches,
    supply,
    handleSupply,
    saveSupply,
    selectSupply,
    deleteSupply,
    confirmDelete,
    closeConfirmModal,
    edit,
    confirmModal,
    exportSupplies,
  } = useSupplies();
  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={searched} searchText={handleSearch} />
      </div>
      <div className="w-full h-[12%] flex items-center justify-end py-[1rem] px-[1.5rem]">
        <CustomButton text="Exportar" onClick={exportSupplies} buttonType="secondary" style={{ marginRight: "12px" }} />
        <CustomButton text="Nuevo" onClick={openModal} buttonType="primary" style={{ marginLeft: "12px" }} />
      </div>
      <div className="w-full h-[60%] flex items-start justify-center px-[1.5rem] py-[1rem]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size="md" color="white" />
          </div>
        ) : (
          <CustomTable
            columns={columns}
            rows={searched !== "" ? filteredSupplies : supplies}
            handleDelete={deleteSupply}
            handleEdit={selectSupply}
          />
        )}
      </div>
      <div className="w-full h-[12%] flex items-center justify-center px-[1.5rem] py-[0.5rem]">
        <CustomPagination
          page={page}
          totalpages={totalPages}
          totalData={total}
          handlePage={handlePage}
          handleRows={handleRows}
          rows={rows}
        />
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={closeModal}
        title={edit ? "Editar insumo" : "Nuevo insumo"}
        action={saveSupply}
      >
        <SupplyForm branches={branches} supply={supply} handleSupply={handleSupply} />
      </CustomModal>
      <CustomModal
        isOpen={confirmModal}
        onClose={closeConfirmModal}
        title="Eliminar insumo"
        action={confirmDelete}
        actionTitle="Eliminar"
        size="xl"
      >
        <div className="w-full h-fit">
          <h4 className="text-base font-semibold text-white">
            Realmente desea eliminar {supply.category} - {supply.name}
          </h4>
        </div>
      </CustomModal>
    </Layout>
  );
}
