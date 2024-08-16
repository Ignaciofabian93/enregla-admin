"use client";
import dynamic from "next/dynamic";
import useUsers from "../hooks/useUsers";
import CustomButton from "../ui/button";
import Header from "../ui/header";
import Layout from "../ui/layout";
import CustomPagination from "../ui/pagination";
import CustomTable from "../ui/table";
import { Spinner } from "@nextui-org/spinner";

const UserForm = dynamic(() => import("@/app/users/_form"), { ssr: false });
const CustomModal = dynamic(() => import("@/app/ui/modal"), { ssr: false });

export default function Users() {
  const {
    users,
    searched,
    handleUser,
    handleSearch,
    columns,
    handlePage,
    handleRows,
    page,
    rows,
    totalPages,
    total,
    user,
    userRoles,
    saveUser,
    edit,
    deleteUser,
    selectUser,
    filteredUsers,
    showModal,
    closeConfirmModal,
    closeModal,
    branches,
    confirmDelete,
    confirmModal,
    openModal,
    loading,
    exportUsers,
  } = useUsers();

  return (
    <Layout>
      <div className="w-full h-[16%] flex items-center mt-2 pt-[1rem] px-[1.5rem]">
        <Header searchedText={searched} searchText={handleSearch} />
      </div>
      <div className="w-full h-[12%] flex items-center justify-end py-[1rem] px-[1.5rem]">
        <CustomButton text="Exportar" onClick={exportUsers} buttonType="secondary" style={{ marginRight: "12px" }} />
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
            rows={searched !== "" ? filteredUsers : users}
            handleDelete={deleteUser}
            handleEdit={selectUser}
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
        title={edit ? "Editar usuario" : "Nuevo usuario"}
        action={saveUser}
      >
        <UserForm branches={branches} user={user} handleUser={handleUser} roles={userRoles} />
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
          <h4 className="text-base font-semibold text-white">Realmente desea eliminar a {user.name}</h4>
        </div>
      </CustomModal>
    </Layout>
  );
}
