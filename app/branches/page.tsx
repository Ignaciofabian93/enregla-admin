"use client";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/spinner";
import CustomButton from "../ui/button";
import Header from "../ui/header";
import Layout from "../ui/layout";
import CustomTable from "../ui/table";
import CustomPagination from "../ui/pagination";
import useBranch from "../hooks/useBranches";

const BranchForm = dynamic(() => import("./_form"), { ssr: false });
const CustomModal = dynamic(() => import("../ui/modal"), { ssr: false });

export default function Branches() {
  const {
    filteredBranches,
    columns,
    rows,
    page,
    handlePage,
    handleRows,
    totalPages,
    total,
    loading,
    handleSearch,
    searched,
    openModal,
    closeModal,
    showModal,
    confirmModal,
    branch,
    edit,
    handleBranch,
    selectBranch,
    saveBranch,
    confirmDelete,
    deleteBranch,
    closeConfirmModal,
    agencies,
    formattedRows,
    exportBranches,
  } = useBranch();
  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={searched} searchText={handleSearch} />
      </div>
      <div className="w-full h-[12%] flex items-center justify-end py-[1rem] px-[1.5rem]">
        <CustomButton text="Exportar" onClick={exportBranches} buttonType="secondary" style={{ marginRight: "12px" }} />
        <CustomButton text="Nuevo" onClick={openModal} buttonType="primary" style={{ marginLeft: "12px" }} />
      </div>
      <div className="w-full h-[60%] flex items-start justify-center px-[1.5rem] py-[0.5rem]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size="md" color="white" />
          </div>
        ) : (
          <CustomTable
            columns={columns}
            rows={searched !== "" ? filteredBranches : formattedRows}
            handleDelete={deleteBranch}
            handleEdit={selectBranch}
          />
        )}
      </div>
      <div className="w-full h-[12%] flex items-center justify-center px-[1.5rem] py-[1rem]">
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
        title={edit ? "Editar sucursal" : "Nueva sucursal"}
        action={saveBranch}
      >
        <BranchForm agencies={agencies} branch={branch} handleBranch={handleBranch} />
      </CustomModal>
      <CustomModal
        isOpen={confirmModal}
        onClose={closeConfirmModal}
        title="Eliminar usuario"
        action={confirmDelete}
        actionTitle="Eliminar"
        size="xl"
      >
        <div className="w-full h-fit">
          <h4 className="text-base font-semibold text-white">
            Realmente desea eliminar la sucursal en {branch.address}
          </h4>
        </div>
      </CustomModal>
    </Layout>
  );
}
