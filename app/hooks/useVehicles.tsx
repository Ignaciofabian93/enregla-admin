import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSessionStore from "../store/session";
import { Brand, Model, Vehicle } from "../types/vehicle";
import {
  DeleteVehicle,
  GetVehicleBrands,
  GetVehicleModels,
  GetVehicles,
  SaveVehicle,
  UpdateVehicle,
} from "../services/vehicles";
import downloadExcel from "../utils/exportSheet";

const defaultVehicle: Vehicle = {
  id: 0,
  brand_id: 0,
  brand: "",
  logo: "",
  model: "",
};

const columns = [
  { label: "Marca", key: "brand" },
  { label: "Modelo", key: "model" },
  { label: "Opciones", key: "options" },
];

export default function useVehicle() {
  const { session } = useSessionStore();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [vehicle, setVehicle] = useState<Vehicle>(defaultVehicle);
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const notifyMessage = (message: string) => toast.success(message);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    fetchVehicles();
  }, [page, rows]);

  useEffect(() => {
    fetchVehicleBrands();
    fetchVehicleModels();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    const response = await GetVehicles({ token: session.token, query: `?page=${page}&rows=${rows}` });
    if (response.error) notifyError(response.error), setLoading(false);
    else {
      setLoading(false);
      setVehicles(response.vehicles);
      setTotal(response.count);
    }
  };

  const fetchVehicleBrands = async () => {
    const response = await GetVehicleBrands({ token: session.token });
    if (response.error) notifyError(response.error);
    else setBrands(response.brands);
  };

  const fetchVehicleModels = async () => {
    const response = await GetVehicleModels({ token: session.token });
    if (response.error) notifyError(response.error);
    else setModels(response.models);
  };

  const vehicleRows = vehicles.map((vehicle) => ({ id: vehicle.id, brand: vehicle.brand, model: vehicle.model }));

  const filteredVehicles = vehicleRows.filter((vehicle) => {
    return (
      vehicle.brand.toLowerCase().includes(searched.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const handleVehicle = (field: string, value: string) => {
    if (field === "brand_selected") {
      const findBrand = brands.find((brand) => brand.brand === value);
      setVehicle({ ...vehicle, brand_id: findBrand?.id as number, brand: value });
    } else {
      setVehicle({ ...vehicle, [field]: value });
    }
  };
  const handleSearch = (text: string) => setSearched(text);

  const selectVehicle = (vehicle_id: number) => {
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicle_id);
    if (vehicle) setVehicle(vehicle), openModal(), setEdit(true);
  };

  const confirmDelete = async () => {
    const response = await DeleteVehicle({ token: session.token, vehicle_id: vehicle.id });
    if (response.error) notifyError(response.error);
    else {
      notifyMessage(response.message);
      closeConfirmModal();
      fetchVehicles();
    }
  };
  const deleteVehicle = async (vehicle_id: number) => {
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicle_id);
    if (vehicle) setVehicle(vehicle), setConfirmModal(true);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => [setShowModal(false), setVehicle(defaultVehicle)];

  const closeConfirmModal = () => setConfirmModal(false);

  const handlePage = (page: number) => setPage(page);
  const handleRows = (rows: number) => setRows(rows);

  const saveVehicle = async () => {
    const { brand, brand_id, model, logo, id } = vehicle;
    setLoading(true);
    const response = edit
      ? await UpdateVehicle({ token: session.token, model_id: id, brand, brand_id, model, logo })
      : await SaveVehicle({ token: session.token, brand, brand_id, model, logo });
    if (response.error) notifyError(response.error), setLoading(false), setEdit(false);
    else {
      setLoading(false);
      notifyMessage(response.message);
      fetchVehicles();
      setVehicle(defaultVehicle);
      setEdit(false);
      closeModal();
      fetchVehicleBrands();
      fetchVehicleModels();
    }
  };

  const totalPages = Math.ceil(total / rows);

  const exportVehicles = () =>
    downloadExcel({
      headers: columns.filter((el) => el.key !== "options"),
      rows: vehicleRows,
      sheet: "Vehículos",
    });

  return {
    vehicle,
    page,
    rows,
    totalPages,
    showModal,
    confirmModal,
    edit,
    loading,
    searched,
    handleSearch,
    columns,
    selectVehicle,
    deleteVehicle,
    openModal,
    closeModal,
    handlePage,
    handleRows,
    handleVehicle,
    filteredVehicles,
    closeConfirmModal,
    confirmDelete,
    saveVehicle,
    vehicleRows,
    brands,
    models,
    total,
    exportVehicles,
  };
}
