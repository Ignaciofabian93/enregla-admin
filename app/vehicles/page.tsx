"use client";
import { Spinner } from "@nextui-org/spinner";
import dynamic from "next/dynamic";
import CustomButton from "../ui/button";
import Header from "../ui/header";
import Layout from "../ui/layout";
import CustomTable from "../ui/table";
import CustomPagination from "../ui/pagination";
import useVehicle from "../../hooks/useVehicles";

const VehicleForm = dynamic(() => import("./_form"), { ssr: false });
const CustomModal = dynamic(() => import("../ui/modal"), { ssr: false });

export default function Vehicles() {
  const {
    searched,
    handleSearch,
    openModal,
    loading,
    columns,
    filteredVehicles,
    selectVehicle,
    deleteVehicle,
    page,
    rows,
    totalPages,
    handlePage,
    handleRows,
    handleVehicle,
    showModal,
    closeConfirmModal,
    closeModal,
    confirmDelete,
    confirmModal,
    edit,
    saveVehicle,
    vehicle,
    vehicleRows,
    brands,
    models,
    total,
    exportVehicles,
  } = useVehicle();
  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={searched} searchText={handleSearch} />
      </div>
      <div className="w-full h-[12%] flex items-center justify-end py-[1rem] px-[1.5rem]">
        <CustomButton text="Exportar" onClick={exportVehicles} buttonType="secondary" style={{ marginRight: "12px" }} />
        <CustomButton text="Nuevo" onClick={openModal} buttonType="primary" style={{ marginLeft: "12px" }} />
      </div>
      <div className="w-full h-[60%] flex items-start justify-start px-[1.5rem] py-[0.5rem]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size="md" color="white" />
          </div>
        ) : (
          <CustomTable
            columns={columns}
            rows={searched !== "" ? filteredVehicles : vehicleRows}
            handleEdit={selectVehicle}
            handleDelete={deleteVehicle}
          />
        )}
      </div>
      <div className="w-full h-[12%] flex items-center justify-center px-[1.5rem] py-[1rem]">
        <CustomPagination
          page={page}
          rows={rows}
          totalData={total}
          totalpages={totalPages}
          handlePage={handlePage}
          handleRows={handleRows}
        />
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={closeModal}
        title={edit ? "Editar vehículo" : "Nuevo vehículo"}
        action={saveVehicle}
        isLoading={loading}
      >
        <VehicleForm vehicle={vehicle} handleVehicle={handleVehicle} brands={brands} models={models} />
      </CustomModal>
      <CustomModal
        isOpen={confirmModal}
        onClose={closeConfirmModal}
        title="Eliminar usuario"
        action={confirmDelete}
        actionTitle="Eliminar"
      >
        <div className="w-full h-fit">
          <h4 className="text-base font-semibold text-white">
            Realmente desea eliminar el vehículo {vehicle.brand} - {vehicle.model}
          </h4>
        </div>
      </CustomModal>
    </Layout>
  );
}
