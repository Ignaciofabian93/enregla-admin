"use client";
import { useEffect, useState } from "react";
import { Branch } from "../types/branch";
import { toast } from "react-toastify";
import { GetAllBranches } from "../services/branches";
import { CreateSupply, UpdateSupply, GetSupplies, DeleteSupply } from "../services/supplies";
import { Supply } from "../types/supply";
import useSessionStore from "@/store/session";
import downloadExcel from "@/utils/exportSheet";

const defaultSupply: Supply = {
  id: 0,
  branch: "",
  agency: "",
  category: "",
  name: "",
  quantity: 0,
  price: 0,
  branch_id: 0,
};

const columns = [
  { label: "Categoría", key: "category" },
  { label: "Nombre/Código", key: "name" },
  { label: "Cantidad", key: "quantity" },
  { label: "Precio", key: "price" },
  { label: "Sucursal", key: "branch" },
  { label: "Agencia", key: "agency" },
  { label: "Opciones", key: "options" },
];

export default function useSupplies() {
  const { session } = useSessionStore();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [supply, setSupply] = useState<Supply>(defaultSupply);
  const [edit, setEdit] = useState<boolean>(false);

  const notifyMessage = (message: string) => toast.success(message);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    fetchSupplies();
  }, [page, rows]);

  useEffect(() => {
    fetchBranches();
  }, [showModal]);

  const fetchBranches = async () => {
    const response = await GetAllBranches({ token: session.token });
    if (response.error) notifyError(response.error);
    else setBranches(response.branches);
  };

  const fetchSupplies = async () => {
    setLoading(true);
    const response = await GetSupplies({ token: session.token, query: `?page=${page}&rows=${rows}` });
    if (response.error) notifyError(response.error), setLoading(false);
    else {
      setSupplies(response.supplies);
      setTotal(response.count);
      setLoading(false);
    }
  };

  const handlePage = (page: number) => setPage(page);
  const handleRows = (rows: number) => setRows(rows);

  const handleSearch = (text: string) => setSearched(text);

  const totalPages = Math.ceil(total / rows);

  const filteredSupplies = supplies.filter((supply) => {
    return (
      supply.name.toLowerCase().includes(searched.toLowerCase()) ||
      supply.category.toLowerCase().includes(searched.toLowerCase()) ||
      supply?.branch?.toLowerCase().includes(searched.toLowerCase()) ||
      supply?.agency?.toLowerCase().includes(searched.toLowerCase()) ||
      supply.price.toString().toLowerCase().includes(searched.toLowerCase()) ||
      supply.quantity.toString().toLowerCase().includes(searched.toLowerCase())
    );
  });
  const openModal = () => setShowModal(true);
  const closeModal = () => [setShowModal(false), setSupply(defaultSupply), setEdit(false)];

  const handleSupply = (field: string, value: string) => {
    if (field === "branch") {
      const findBranch = branches.find((branch) => branch.address === value);
      setSupply({ ...supply, branch: value, branch_id: findBranch?.id as number });
    } else {
      setSupply({ ...supply, [field]: value });
    }
  };

  const selectSupply = (supply_id: number) => {
    const supplySelected = supplies.find((supply) => supply.id === supply_id);
    if (supplySelected) setSupply(supplySelected), openModal(), setEdit(true);
  };

  const saveSupply = async () => {
    const { name, category, branch, price, quantity } = supply;
    if (!name || !category || !branch || !quantity || !price) {
      notifyError("Por favor complete todos los campos");
      return;
    }
    const findBranch = branches.find((branch) => branch.address === supply.branch);
    const response = edit
      ? await UpdateSupply({
          token: session.token,
          supply_id: supply.id,
          category,
          name,
          quantity,
          price,
          branch_id: findBranch?.id as number,
        })
      : await CreateSupply({
          token: session.token,
          category,
          name,
          quantity,
          price,
          branch_id: findBranch?.id as number,
        });
    if (response.error) notifyError(response.error);
    else notifyMessage(response.message), closeModal(), fetchSupplies(), setEdit(false);
  };

  const confirmDelete = async () => {
    const response = await DeleteSupply({ token: session.token, supply_id: supply.id });
    if (response.error) notifyError(response.error);
    else {
      notifyMessage(response.message);
      closeConfirmModal();
      fetchSupplies();
    }
  };

  const deleteSupply = async (supply_id: number) => {
    const supply = supplies.find((supply) => supply.id === supply_id);
    if (supply) setSupply(supply), setConfirmModal(true);
  };

  const closeConfirmModal = () => setConfirmModal(false);

  const exportSupplies = () =>
    downloadExcel({
      headers: columns.filter((el) => el.key !== "options"),
      rows: supplies,
      sheet: "Insumos",
    });

  return {
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
  };
}
