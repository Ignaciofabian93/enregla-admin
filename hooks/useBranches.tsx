import { useEffect, useState } from "react";
import { Branch } from "../types/branch";
import { toast } from "react-toastify";
import { Agency } from "../types/agency";
import { CreateBranch, DeleteBranch, GetBranches, UpdateBranch } from "../services/branches";
import { GetAllAgencies } from "../services/agencies";
import useSessionStore from "@/store/session";
import downloadExcel from "@/utils/exportSheet";

const defaultBranch: Branch = {
  id: 0,
  agency_id: 0,
  agency: "",
  address: "",
  location: "",
  telephone: "",
  labels: [],
  users: [],
};

const columns = [
  { label: "Consecionario", key: "agency" },
  { label: "Ubicación", key: "location" },
  { label: "Dirección", key: "address" },
  { label: "Teléfono", key: "telephone" },
  { label: "Etiquetas", key: "labels" },
  { label: "Personal", key: "users" },
  { label: "Opciones", key: "options" },
];

export default function useBranch() {
  const { session } = useSessionStore();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [branch, setBranch] = useState<Branch>(defaultBranch);
  const [edit, setEdit] = useState<boolean>(false);

  const notifyMessage = (message: string) => toast.success(message);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    fetchAgencies();
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [page, rows]);

  const fetchBranches = async () => {
    setLoading(true);
    const response = await GetBranches({ token: session.token, query: `?page=${page}&rows=${rows}` });
    if (response.error) notifyError(response.error), setLoading(false);
    else {
      setBranches(response.branches);
      setTotal(response.count);
      setLoading(false);
    }
  };

  const fetchAgencies = async () => {
    const response = await GetAllAgencies({ token: session.token });
    if (response.error) notifyError(response.error);
    else setAgencies(response.agencies);
  };

  const handlePage = (usersPage: number) => setPage(usersPage);
  const handleRows = (usersRows: number) => setRows(usersRows);

  const handleSearch = (text: string) => setSearched(text);

  const totalPages = Math.ceil(total / rows);

  const formattedRows = branches.map((branch) => ({
    ...branch,
    users: branch.users.length,
    labels: branch.labels.length,
  }));

  const filteredBranches = formattedRows.filter((branch) => {
    return (
      branch.agency.toLowerCase().includes(searched.toLowerCase()) ||
      branch.address.toLowerCase().includes(searched.toLowerCase()) ||
      branch.telephone.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => [setShowModal(false), setBranch(defaultBranch)];

  const handleBranch = (field: string, value: string) => {
    if (field === "agency") {
      const findAgency = agencies.find((agency) => agency.name === value);
      setBranch({ ...branch, agency_id: findAgency?.id as number, agency: findAgency?.name as string });
    } else {
      setBranch({ ...branch, [field]: value });
    }
  };

  const selectBranch = (branch_id: number) => {
    const branch = branches.find((branch) => branch.id === branch_id);
    if (branch) setBranch(branch), openModal(), setEdit(true);
  };

  const saveBranch = async () => {
    const { agency, address, location, id } = branch;
    if (!agency || !address || !location) {
      notifyError("Por favor complete todos los campos");
      return;
    }
    const response = edit
      ? await UpdateBranch({ token: session.token, id, branch })
      : await CreateBranch({ token: session.token, branch });
    console.log("RES: ", response);

    if (response.error) notifyError(response.error);
    else notifyMessage(response.message), closeModal(), fetchBranches();
  };

  const confirmDelete = async () => {
    const response = await DeleteBranch({ token: session.token, id: branch.id });
    if (response.error) notifyError(response.error);
    else {
      notifyMessage(response.message);
      closeConfirmModal();
      fetchBranches();
    }
  };

  const deleteBranch = async (branch_id: number) => {
    const branch = branches.find((branch) => branch.id === branch_id);
    if (branch) setBranch(branch), setConfirmModal(true);
  };

  const closeConfirmModal = () => setConfirmModal(false);

  const exportBranches = () =>
    downloadExcel({
      headers: columns.filter((el) => el.key !== "options"),
      rows: formattedRows,
      sheet: "Sucursales",
    });

  return {
    filteredBranches,
    columns,
    rows,
    handlePage,
    handleRows,
    totalPages,
    total,
    loading,
    handleSearch,
    searched,
    page,
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
  };
}
