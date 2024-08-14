import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Branch } from "../types/branch";
import { toast } from "react-toastify";
import { GetAllBranches, GetBranches } from "../services/branches";
import { CreateUser, DeleteUser, GetUsers, UpdateUser } from "../services/users";
import useSessionStore from "../store/session";

const defaultUser: User = {
  id: 0,
  name: "",
  rut: "",
  email: "",
  branch_id: 0,
  branch: "",
  role_id: 0,
  role: "",
};

const userRoles = [
  { id: 2, value: "Supervisor" },
  { id: 3, value: "Operador" },
];

const columns = [
  { label: "Nombre", key: "name" },
  { label: "RUT", key: "rut" },
  { label: "Email", key: "email" },
  { label: "Sucursal", key: "branch" },
  { label: "Cargo", key: "role" },
  { label: "Opciones", key: "options" },
];

export default function useUsers() {
  const { token } = useSessionStore();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [edit, setEdit] = useState<boolean>(false);

  const notifyMessage = (message: string) => toast.success(message);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [page, rows, token]);

  useEffect(() => {
    if (token) {
      fetchBranches();
    }
  }, [showModal, token]);

  const fetchBranches = async () => {
    const response = await GetAllBranches({ token });
    console.log("branches", response);

    if (response.error) notifyError(response.error);
    else setBranches(response.branches);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const response = await GetUsers({ token, query: `?page=${page}&rows=${rows}` });
    if (response.error) notifyError(response.error), setLoading(false);
    else {
      setUsers(response.users);
      setTotal(response.count);
      setLoading(false);
    }
  };

  const handlePage = (page: number) => setPage(page);
  const handleRows = (rows: number) => setRows(rows);

  const handleSearch = (text: string) => setSearched(text);

  const totalPages = Math.ceil(total / rows);

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searched.toLowerCase()) ||
      user.rut.toLowerCase().includes(searched.toLowerCase()) ||
      user.email.toLowerCase().includes(searched.toLowerCase()) ||
      user.branch.toLowerCase().includes(searched.toLowerCase()) ||
      user.role.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => [setShowModal(false), setUser(defaultUser)];

  const handleUser = (field: string, value: string) => {
    if (field === "branch") {
      const findBranch = branches.find((branch) => branch.address === value);
      setUser({ ...user, branch: findBranch?.address as string, branch_id: findBranch?.id as number });
    } else if (field === "role") {
      const findRole = userRoles.find((role) => role.value === value);
      setUser({ ...user, role: findRole?.value as string, role_id: findRole?.id as number });
    } else setUser({ ...user, [field]: value });
  };

  const selectUser = (user_id: number) => {
    const user = users.find((user) => user.id === user_id);
    if (user) setUser(user), openModal(), setEdit(true);
  };

  const saveUser = async () => {
    const { name, rut, email, branch_id, role_id } = user;
    if (!name || !rut || !email || !branch_id || !role_id) {
      notifyError("Por favor complete todos los campos");
      return;
    }
    const response = edit ? await UpdateUser({ token, id: user.id, user }) : await CreateUser({ token, user });
    if (response.error) notifyError(response.error);
    else notifyMessage(response.message), closeModal(), fetchUsers();
  };

  const confirmDelete = async () => {
    const response = await DeleteUser({ token, id: user.id });
    if (response.error) notifyError(response.error);
    else {
      notifyMessage(response.message);
      closeConfirmModal();
      fetchUsers();
    }
  };

  const deleteUser = async (user_id: number) => {
    const user = users.find((user) => user.id === user_id);
    if (user) setUser(user), setConfirmModal(true);
  };

  const closeConfirmModal = () => setConfirmModal(false);

  return {
    users,
    filteredUsers,
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
    user,
    handleUser,
    userRoles,
    saveUser,
    selectUser,
    deleteUser,
    confirmDelete,
    closeConfirmModal,
    edit,
    confirmModal,
  };
}
